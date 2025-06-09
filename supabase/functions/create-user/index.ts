
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Authorization header required' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Criar cliente Supabase com service role para operações administrativas
    const supabaseAdmin = createClient(
      'https://ofbhoebgllkfmlcvtanr.supabase.co',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Criar cliente normal para verificar permissões
    const supabase = createClient(
      'https://ofbhoebgllkfmlcvtanr.supabase.co',
      Deno.env.get('SUPABASE_ANON_KEY')!,
      {
        global: {
          headers: {
            Authorization: authHeader,
          },
        },
      }
    );

    // Verificar se o usuário atual é master
    const { data: isMaster } = await supabase.rpc('is_current_user_master');
    if (!isMaster) {
      return new Response(JSON.stringify({ error: 'Unauthorized: Only master users can create users' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { email, password, name, user_type, school_ids, isSchoolAdmin = false } = await req.json();

    console.log('Received data:', { email, name, user_type, school_ids, isSchoolAdmin });

    if (!email || !password || !name || !user_type) {
      return new Response(JSON.stringify({ error: 'Missing required fields: email, password, name, user_type' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Criar usuário no Auth
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name,
        user_type,
      },
    });

    if (authError) {
      console.error('Error creating auth user:', authError);
      return new Response(JSON.stringify({ error: authError.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Auth user created:', authUser.user.id);

    // Criar perfil do usuário
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: authUser.user.id,
        name,
        email,
        user_type,
      })
      .select()
      .single();

    if (profileError) {
      console.error('Error creating profile:', profileError);
      // Se falhar, deletar o usuário de auth também
      await supabaseAdmin.auth.admin.deleteUser(authUser.user.id);
      return new Response(JSON.stringify({ error: `Profile creation failed: ${profileError.message}` }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Profile created:', profile.id);

    // Associar usuário às escolas selecionadas
    if (school_ids && school_ids.length > 0) {
      const userSchoolsData = school_ids.map((school_id: string) => ({
        user_id: authUser.user.id,
        school_id,
      }));

      const { error: userSchoolsError } = await supabaseAdmin
        .from('user_schools')
        .insert(userSchoolsData);

      if (userSchoolsError) {
        console.error('Error associating user to schools:', userSchoolsError);
        // Não vamos falhar completamente por causa disso, apenas logar o erro
      } else {
        console.log('User associated to schools:', school_ids);
      }

      // Se for admin da escola, atualizar o campo admin_user_id da primeira escola
      if (isSchoolAdmin && school_ids.length > 0) {
        const { error: schoolUpdateError } = await supabaseAdmin
          .from('schools')
          .update({ admin_user_id: authUser.user.id })
          .eq('id', school_ids[0]);

        if (schoolUpdateError) {
          console.error('Error setting school admin:', schoolUpdateError);
          // Não vamos falhar completamente por causa disso, apenas logar o erro
        } else {
          console.log('School admin set for school:', school_ids[0]);
        }
      }
    }

    return new Response(JSON.stringify({ 
      user: authUser.user,
      profile,
      message: 'User created successfully'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in create-user function:', error);
    return new Response(JSON.stringify({ error: `Server error: ${error.message}` }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
