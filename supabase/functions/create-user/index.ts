
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
      school_ids
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

    // Validar se school_ids foi fornecido e é um array
    if (!school_ids || !Array.isArray(school_ids) || school_ids.length === 0) {
      console.error('Missing or invalid school_ids')
      return new Response(
        JSON.stringify({ 
          error: 'Missing or invalid school_ids - must be a non-empty array'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Verificar se o usuário já existe
    const { data: existingUser } = await supabaseClient.auth.admin.listUsers()
    const userExists = existingUser.users.some(user => user.email === email)

    if (userExists) {
      console.error('User already exists with email:', email)
      return new Response(
        JSON.stringify({ 
          error: 'Usuário já existe com este email'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('Creating user with:', { email, name, user_type, school_ids })

    // Criar usuário no Auth - o trigger handle_new_user criará o perfil automaticamente
    const { data: authData, error: authError } = await supabaseClient.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        name,
        user_type
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

    // Aguardar um pouco para o trigger criar o perfil
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Verificar se o perfil foi criado pelo trigger
    const { data: profileData, error: profileCheckError } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', authData.user!.id)
      .single()

    if (profileCheckError || !profileData) {
      console.error('Profile not found after creation, trigger may have failed')
      // Se o perfil não foi criado pelo trigger, criar manualmente
      const { error: manualProfileError } = await supabaseClient
        .from('profiles')
        .insert({
          id: authData.user!.id,
          name,
          email,
          user_type
        })

      if (manualProfileError) {
        console.error('Manual profile creation error:', manualProfileError)
        // Remover o usuário se falhar ao criar o perfil
        await supabaseClient.auth.admin.deleteUser(authData.user!.id)
        
        return new Response(
          JSON.stringify({ error: 'Failed to create user profile', details: manualProfileError.message }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }
    }

    console.log('Profile confirmed or created successfully')

    // Criar relacionamentos na tabela user_schools para cada escola
    const userSchoolsData = school_ids.map(schoolId => ({
      user_id: authData.user!.id,
      school_id: schoolId
    }))

    console.log('Creating user-school relationships:', userSchoolsData)
    
    const { error: userSchoolError } = await supabaseClient
      .from('user_schools')
      .insert(userSchoolsData)

    if (userSchoolError) {
      console.error('User-school relationship error:', userSchoolError)
      
      // Se falhar ao criar os relacionamentos, remover usuário e perfil
      await supabaseClient.from('profiles').delete().eq('id', authData.user!.id)
      await supabaseClient.auth.admin.deleteUser(authData.user!.id)
      
      return new Response(
        JSON.stringify({ error: 'Failed to create user-school relationships', details: userSchoolError.message }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('User-school relationships created successfully')

    return new Response(
      JSON.stringify({ 
        success: true, 
        user: {
          id: authData.user!.id,
          email: authData.user!.email,
          name,
          user_type,
          school_ids
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
