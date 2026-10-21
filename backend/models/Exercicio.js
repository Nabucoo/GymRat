class Exercicio {
  constructor(id_exercicio = '', nome = '', carga = 0, series = 0, repeticoes = 0, grupo_muscular = '') {
    this.id_exercicio = id_exercicio
    this.nome = nome
    this.grupo_muscular = grupo_muscular
    this.carga = carga
    this.series = series
    this.repeticoes = repeticoes
  }
}

module.exports = Exercicio
