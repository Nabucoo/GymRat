class Ficha {
  constructor(id_ficha, nome, descricao, exercicios = []) {
    this.id_ficha = id_ficha
    this.nome = nome
    this.descricao = descricao
    this.exercicios = exercicios
  }
}

module.exports = Ficha
