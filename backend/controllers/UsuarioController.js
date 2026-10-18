const UsuarioDAO = require('../daos/UsuarioDAO')

class UsuarioController {
  constructor(usuarioDAO = new UsuarioDAO()) {
    this.usuarioDAO = usuarioDAO
  }

  inserirUsuario(email, nome, senha) {}
  buscarUsuario(email) {}
  editarUsuario(email, nome, senha) {}
  removerUsuario(email) {}
}

module.exports = UsuarioController
