
const pool = require('../database/connection')

const MedidasDAO = {
  async criarMedida(id_usuario, altura, peso, data) {
    const resultado = await pool.query(
      'INSERT INTO public."Medidas" (id_usuario, altura, peso, data) VALUES ($1, $2, $3, $4) RETURNING id_medida, id_usuario, altura, peso, data',
      [id_usuario, altura, peso, data]
    )

    return {
      sucess: true,
      mensagem: 'Medida cadastrada com sucesso',
      dados: resultado.rows[0]
    }
  },

  async buscarMedidaPorId(id_medida) {
    const resultado = await pool.query(
      'SELECT * FROM public."Medidas" WHERE "id_medida" = $1',
      [id_medida]
    )

    if (resultado.rowCount === 0) {
      return {
        sucess: false,
        mensagem: 'Medida não encontrada'
      }
    }

    return {
      sucess: true,
      mensagem: 'Medida encontrada com sucesso',
      dados: resultado.rows[0]
    }
  },

  async atualizarMedida(id_medida, altura, peso, data) {
    const resultado = await pool.query(
      'UPDATE public."Medidas" SET altura = $1, peso = $2, data = $3 WHERE "id_medida" = $4 RETURNING id_medida, altura, peso, data',
      [altura, peso, data, id_medida]
    )

    if (resultado.rowCount === 0) {
      return {
        sucess: false,
        mensagem: 'Medida não encontrada'
      }
    }
    return {
      sucess: true,
      mensagem: 'Medida editada com sucesso',
      dados: resultado.rows[0]
    }
  },

  async removerMedida(id_medida) {
    const resultado = await pool.query(
      'DELETE FROM public."Medidas" WHERE "id_medida" = $1',
      [id_medida]
    )

    if (resultado.rowCount === 0) {
      return {
        sucess: false,
        mensagem: 'Medida não encontrada'
      }
    }

    return {
      sucess: true,
      mensagem: 'Medida deletada com sucesso'
    }
  }
}

module.exports = MedidasDAO
