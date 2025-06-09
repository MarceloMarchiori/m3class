
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const requestData = await req.json()
    console.log('Received request data:', requestData)

    const { 
      email, 
      password, 
      name, 
      user_type, 
      school_id, 
      secretaria_role 
    } = requestData

    // Validação básica
    if (!email || !password || !name || !user_type) {
      console.error('Missing required fields')
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields', 
          details: { email: !!email, password: !!password, name: !!name, user_type: !!user_type }
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('Creating user with:', { email, name, user_type, school_id, secretaria_role })

    // Criar usuário no Auth
    const { data: authData, error: authError } = await supabaseClient.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        name,
        user_type,
        school_id,
        secretaria_role
      },
      email_confirm: true
    })

    if (authError) {
      console.error('Auth error:', authError)
      return new Response(
        JSON.stringify({ error: 'Failed to create user', details: authError.message }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('User created in auth:', authData.user?.id)

    // Criar perfil na tabela profiles
    const profileData = {
      id: authData.user!.id,
      name,
      email,
      user_type,
      school_id: school_id || null,
      secretaria_role: secretaria_role || null
    }

    console.log('Creating profile:', profileData)

    const { error: profileError } = await supabaseClient
      .from('profiles')
      .insert(profileData)

    if (profileError) {
      console.error('Profile error:', profileError)
      
      // Se falhar ao criar o perfil, remover o usuário do auth
      await supabaseClient.auth.admin.deleteUser(authData.user!.id)
      
      return new Response(
        JSON.stringify({ error: 'Failed to create user profile', details: profileError.message }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('Profile created successfully')

    // Criar relacionamento na tabela user_schools se school_id foi fornecido
    if (school_id) {
      console.log('Creating user-school relationship:', { user_id: authData.user!.id, school_id })
      
      const { error: userSchoolError } = await supabaseClient
        .from('user_schools')
        .insert({
          user_id: authData.user!.id,
          school_id: school_id
        })

      if (userSchoolError) {
        console.error('User-school relationship error:', userSchoolError)
        // Não falhar aqui, apenas logar o erro
      } else {
        console.log('User-school relationship created successfully')
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        user: {
          id: authData.user!.id,
          email: authData.user!.email,
          name,
          user_type,
          school_id
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
