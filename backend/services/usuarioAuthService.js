const supabase = require('./supabaseClient')

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

module.exports = { cadastrarUsuario, entrarUsuario }
