const pool = require('../database/connection')

const fichaExercicioDAO = {
    async adicionarExercicioAFicha(id_ficha, id_exercicio) {
        const resultado = await pool.query(
            'INSERT INTO public."Ficha_Exercicio" VALUES ($1, $2) RETURNING *', [id_ficha, id_exercicio]
        )

        if (resultado.rowCount === 0) {
            return {
                sucess: false,
                mensagem: 'Exercício não encontrado'
            }
        }

        return {
            sucess: true,
            mensagem: 'Exercício adicionado à ficha com sucesso',
            dados: resultado.rows[0]
        }
    },

    async buscarExercicioNaFicha(id_ficha, id_exercicio) {
        const resultado = await pool.query(
            `SELECT fe.id_ficha_exercicio, fe.id_ficha, fe.id_exercicio,
              e.nome, e.grupo_muscular, e.carga, e.series, e.repeticoes
       FROM public."Ficha_Exercicio" fe
       JOIN public."Exercicio" e ON e.id_exercicio = fe.id_exercicio
       WHERE fe.id_ficha = $1 AND fe.id_exercicio = $2`, [id_ficha, id_exercicio]
        )

        if (resultado.rowCount === 0) {
            return {
                sucess: false,
                mensagem: 'Exercício não encontrado nesta ficha'
            }
        }

        return {
            sucess: true,
            mensagem: 'Exercício encontrado na ficha com sucesso',
            dados: resultado.rows[0]
        }
    },

    async removerExercicioDaFicha(id_ficha, id_exercicio) {
        const resultado = await pool.query(
            'DELETE FROM public."Ficha_Exercicio" WHERE id_ficha = $1 AND id_exercicio = $2 RETURNING *', [id_ficha, id_exercicio]
        )

        if (resultado.rowCount === 0) {
            return {
                sucess: false,
                mensagem: 'Exercício não encontrado nesta ficha'
            }
        }

        return {
            sucess: true,
            mensagem: 'Exercício removido da ficha com sucesso'
        }
    }
}

module.exports = fichaExercicioDAO