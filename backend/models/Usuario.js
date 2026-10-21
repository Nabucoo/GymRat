class Usuario {
  constructor(email = '', nome = '', senha = '', id_usuario = null) {
    this.id_usuario = id_usuario
    this.email = email
    this.nome = nome
    this.senha = senha
    this.medidas = []
    this.fichas = []
  }

  toJSON() {
    return {
      id_usuario: this.id_usuario,
      email: this.email,
      nome: this.nome,
      medidas: this.medidas,
      fichas: this.fichas
    }
  }
}

module.exports = Usuario
