class Usuario {
  constructor(email = '', nome = '', senha = '') {
    this.email = email
    this.nome = nome
    this.senha = senha
    this.medidas = []
    this.fichas = []
  }
}

module.exports = Usuario
