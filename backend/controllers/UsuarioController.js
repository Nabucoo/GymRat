const usuarioDAO = require('../daos/UsuarioDAO')
const Usuario = require('../models/Usuario')
const usuarioAuth = require('../services/usuarioAuthService')

const usuarioController = {
  //const usuarioDAO = usuarioDAO
  
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
      await usuarioDAO.criarUsuario(userData.id, userData.email, usuario.nome)
      return res.status(201).json({'mensagem': "Usuario criado"})
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
      await usuarioDAO.buscarUsuarioPorId(userData.usuario.id)
      return res.status(200).json({"mensagem": "usuario logado com sucesso!", "token": userData.sessao.access_token})
    } catch (e) {
      return res.status(401).json({"mensagem": "não foi possível logar!"})
    }

  },

  buscarUsuario(email) {},

  editarUsuario(email, nome, senha) {},

  removerUsuario(email) {},

}

module.exports = usuarioController
