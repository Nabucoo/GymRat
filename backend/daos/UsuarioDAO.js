const pool = require('../database/connection')

const UsuarioDAO = {
  async criarUsuario(id_usuario, email, nome) {
    const resultado = await pool.query(
      'INSERT INTO public."Usuario" (id_usuario, email, nome) VALUES ($1, $2, $3) RETURNING id_usuario, nome, email',
      [id_usuario, email, nome]
    )

    return {
      sucess: true,
      mensagem: 'Usuário cadastrado com sucesso',
      dados: resultado.rows[0]
    }
  },

  async buscarUsuarioPorId(id_usuario) {
    const resultado = await pool.query(
      'SELECT * FROM public."Usuario" WHERE id_usuario = $1',
      [id_usuario]
    )

    if (resultado.rowCount === 0) {
      return { sucess: false, mensagem: 'Usuário não encontrado' }
    }

    return {
      sucess: true,
      mensagem: 'Usuário encontrado com sucesso',
      dados: resultado.rows[0]
    }
  },

  async atualizarUsuario(id_usuario, email, nome) {
    const resultado = await pool.query(
      'UPDATE public."Usuario" SET email = $1, nome = $2 WHERE id_usuario = $3 RETURNING id_usuario, nome, email',
      [email, nome, id_usuario]
    )

    if (resultado.rowCount === 0) {
      return { sucess: false, mensagem: 'Usuário não encontrado' }
    }

    return {
      sucess: true,
      mensagem: 'Usuário editado com sucesso',
      dados: resultado.rows[0]
    }
  },

  async removerUsuario(id_usuario) {
    const resultado = await pool.query(
      'DELETE FROM public."Usuario" WHERE id_usuario = $1',
      [id_usuario]
    )

    if (resultado.rowCount === 0) {
      return {
        sucess: false,
        mensagem: 'Usuário não encontrado'
      }
    }

    return {
      sucess: true,
      mensagem: 'Usuário deletado com sucesso'
    }
  }
}
module.exports = UsuarioDAO

