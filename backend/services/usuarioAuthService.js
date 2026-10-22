const supabase = require('./supabaseClient')
const { createClient } = require('@supabase/supabase-js')

async function cadastrarUsuario({ email, senha }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: senha,
  })

  if (error) {
    throw error
  }

  return data.user
}

async function entrarUsuario({ email, senha }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  })

  if (error) {
    throw error
  }

  return {
    usuario: data.user,
    sessao: data.session
  }
}

async function apagarUsuario({ id }) {
  const url = process.env.SUPABASE_URL
  const adminKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY
  if (!url || !adminKey) {
    throw new Error('Configure SUPABASE_SERVICE_ROLE_KEY para remover contas')
  }

  const adminClient = createClient(url, adminKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  })
  const { data, error } = await adminClient.auth.admin.deleteUser(id)

  if (error) {
    throw error
  }

  return data
}

module.exports = { cadastrarUsuario, entrarUsuario, apagarUsuario }
