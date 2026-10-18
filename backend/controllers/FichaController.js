const FichasDAO = require('../daos/FichasDAO')

class FichaController {
  constructor(fichaDAO = new FichasDAO()) {
    this.fichaDAO = fichaDAO
  }

  inserirFicha(nome, email) {}
  listarFicha(idUsuario) {}
  editarFicha(idFicha, nome) {}
  removerFicha(idFicha) {}
}

module.exports = FichaController
