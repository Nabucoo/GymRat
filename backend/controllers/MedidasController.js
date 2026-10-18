const MedidasDAO = require('../daos/MedidasDAO')

class MedidasController {
  constructor(medidasDAO = new MedidasDAO()) {
    this.medidasDAO = medidasDAO
  }

  inserirMedida(email, altura, peso, data) {}
  buscarMedida(idMedida) {}
  editarMedida(idMedida, altura, peso, data) {}
  removerMedida(idMedida) {}
}

module.exports = MedidasController
