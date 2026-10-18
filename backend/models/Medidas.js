class Medidas {
  constructor(idMedidas = 0, altura = '', peso = 0, data = new Date()) {
    this.idMedidas = idMedidas
    this.altura = altura
    this.peso = peso
    this.data = data
  }
}

module.exports = Medidas
