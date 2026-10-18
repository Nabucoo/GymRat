class Exercicio {
  constructor(idExercicio = '', nome = '', carga = 0, series = 0, repeticoes = 0) {
    this.idExercicio = idExercicio
    this.nome = nome
    this.carga = carga
    this.series = series
    this.repeticoes = repeticoes
  }
}

module.exports = Exercicio
