class Medidas {
  constructor(id_medida = 0, altura = '', peso = 0, data = new Date()) {
    this.id_medida = id_medida
    this.altura = altura
    this.peso = peso
    this.data = data
  }
}

module.exports = Medidas
