const usuarioDAO = require('../daos/UsuarioDAO')
const Usuario = require('../models/Usuario')
const usuarioAuth = require('../services/usuarioAuthService')

const usuarioController = {
  
  async inserirUsuario(req, res) {
    if (!req.body) {
      return res.status(400).json({'mensagem': "Campo inválido!"})
    }

    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

    if (typeof nome != "string" || typeof email != "string" || typeof senha != "string") {
      return res.status(400).json({'mensagem': "Campo inválido!"})
    }

    if (!nome || !email || !senha) {
      return res.status(400).json({'mensagem': "Campo inválido!"})
    }

    const usuario = new Usuario(email, nome, senha)

   
    try {
      const userData = await usuarioAuth.cadastrarUsuario({
      email: usuario.email,
      senha: usuario.senha,
      })
      const resultado = await usuarioDAO.criarUsuario(userData.id, userData.email, usuario.nome)
      const usuarioCriado = new Usuario(resultado.dados.email, resultado.dados.nome, '', resultado.dados.id_usuario)
      return res.status(201).json({ usuario: usuarioCriado })
    } catch (e) {
      return res.status(500).json({'mensagem': "Não foi possível concluir o cadastro!"})
    }
  },

  async entrarUsuario(req, res) {
    if (!req.body) {
      return res.status(400).json({'mensagem': "Campo inválido!"})
    }

    const email = req.body.email;
    const senha = req.body.senha;

    if (typeof email != "string" || typeof senha != "string") {
      return res.status(400).json({'mensagem': "Campo inválido!"})
    }

    if (!email || !senha) {
      return res.status(400).json({'mensagem': "Campo inválido!"})
    }


    try {
      const userData = await usuarioAuth.entrarUsuario({
        email: email,
        senha: senha
      })
      const resultado = await usuarioDAO.buscarUsuarioPorId(userData.usuario.id)
      if (!resultado.sucess) return res.status(404).json({ mensagem: resultado.mensagem })
      const usuarioLogado = new Usuario(resultado.dados.email, resultado.dados.nome, '', resultado.dados.id_usuario)
      return res.status(200).json({ usuario: usuarioLogado, token: userData.sessao.access_token })
    } catch (e) {
      return res.status(401).json({"mensagem": "não foi possível logar!"})
    }
  },

  async removerUsuario(req, res) {
    try {
      await usuarioDAO.removerUsuario(req.user.id)

   
      await usuarioAuth.apagarUsuario({ id: req.user.id })

      return res.status(200).json({ mensagem: 'Usuário deletado com sucesso' })
    } catch (e) {
      console.error('Falha ao remover usuário:', { code: e.code, message: e.message })
      return res.status(500).json({ mensagem: 'Não foi possível remover a conta!' })
    }
  },

}

module.exports = usuarioController
