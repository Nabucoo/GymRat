class Ficha {
  constructor(idFicha = 0, nome = '') {
    this.idFicha = idFicha
    this.nome = nome
    this.exercicios = []
  }
}

module.exports = Ficha
