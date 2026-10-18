const ExercicioDAO = require('../daos/ExercicioDAO')

class ExercicioController {
  constructor(exercicioDAO = new ExercicioDAO()) {
    this.exercicioDAO = exercicioDAO
  }

  inserirExercicio(nome, carga, series, repeticoes, idFicha) {}
  buscarExercicio(idExercicio) {}
  editarExercicio(idExercicio, nome, carga, series, repeticoes) {}
  removerExercicio(idExercicio) {}
}

module.exports = ExercicioController
