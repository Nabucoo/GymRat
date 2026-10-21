const pool = require('../database/connection')

const ExercicioDAO = {
  async criarExercicio(nome, grupo_muscular, carga, series, repeticoes, id_usuario) {
    const resultado = await pool.query(
      'INSERT INTO public."Exercicio" (nome, grupo_muscular, carga, series, repeticoes, id_usuario) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nome, grupo_muscular, carga, series, repeticoes, id_usuario]
    )

    return {
      sucess: true,
      mensagem: 'Exercício cadastrado com sucesso',
      dados: resultado.rows[0]
    }
  },

  async buscarExercicioPorId(id_exercicio) {
    const resultado = await pool.query(
      'SELECT * FROM public."Exercicio" WHERE id_exercicio = $1',
      [id_exercicio]
    )

    if (resultado.rowCount === 0) {
      return {
        sucess: false,
        mensagem: 'Exercício não encontrado'
      }
    }

    return {
      sucess: true,
      mensagem: 'Exercício encontrado com sucesso',
      dados: resultado.rows[0]
    }
  },

  async atualizarExercicio(id_exercicio, nome, grupo_muscular, carga, series, repeticoes) {
    const resultado = await pool.query(
      'UPDATE public."Exercicio" SET nome = $1, grupo_muscular = $2, carga = $3, series = $4, repeticoes = $5 WHERE id_exercicio = $6 RETURNING *',
      [nome, grupo_muscular, carga, series, repeticoes, id_exercicio]
    )

    if (resultado.rowCount === 0) {
      return {
        sucess: false,
        mensagem: 'Exercício não encontrado'
      }
    }

    return {
      sucess: true,
      mensagem: 'Exercício editado com sucesso',
      dados: resultado.rows[0]
    }
  },

  async removerExercicio(id_exercicio) {
    const resultado = await pool.query(
      'DELETE FROM public."Exercicio" WHERE id_exercicio = $1',
      [id_exercicio]
    )

    if (resultado.rowCount === 0) {
      return {
        sucess: false,
        mensagem: 'Exercício não encontrado'
      }
    }

    return {
      sucess: true,
      mensagem: 'Exercício deletado com sucesso'
    }
  },

  async listarExerciciosPorGrupoMuscular(grupo_muscular) {
    const resultado = await pool.query(
      'SELECT * FROM public."Exercicio" WHERE grupo_muscular = $1',
      [grupo_muscular]
    )

    if (resultado.rowCount === 0) {
      return {
        sucess: false,
        mensagem: 'Nenhum exercício encontrado'
      }
    }
    return {
      sucess: true,
      mensagem: 'Exercícios listados com sucesso',
      dados: resultado.rows
    }
  }
}

module.exports = ExercicioDAO
