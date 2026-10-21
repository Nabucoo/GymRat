const pool = require('../database/connection')

const FichasDAO = {

    async criarFicha(nome, descricao, id_usuario) {
        const resultado = await pool.query(
            'INSERT INTO public."Ficha" (nome, descricao, id_usuario) VALUES ($1, $2, $3) RETURNING *', [nome, descricao, id_usuario]
        )
        return {
            sucess: true,
            mensagem: 'Ficha cadastrada com sucesso',
            dados: resultado.rows[0]
        }

    },
    async listarFichasPorUsuario(id_usuario) {
        const resultado = await pool.query(
            'SELECT * FROM public."Ficha" WHERE id_usuario = $1', [id_usuario]
        )

        return {
            sucess: true,
            mensagem: 'Fichas listadas com sucesso',
            dados: resultado.rows
        }
    },

    async atualizarFicha(nome, descricao, id_usuario, id_ficha) {
        const resultado = await pool.query(
            'UPDATE public."Ficha" SET nome = $1, descricao = $2 WHERE id_ficha = $3 AND id_usuario = $4', [nome, descricao, id_ficha, id_usuario]
        )
        if (resultado.rowCount === 0) {
            return { sucess: false, mensagem: 'Ficha não encontrada' }
        }

        return { sucess: true, mensagem: 'Ficha editada com sucesso' }
    },

    async removerFicha(id_ficha, id_usuario) {
        const resultado = await pool.query(
            'DELETE FROM public."Ficha" WHERE id_ficha = $1 AND id_usuario = $2', [id_ficha, id_usuario]
        )
        if (resultado.rowCount === 0) {
            return { sucess: false, mensagem: 'Ficha não encontrada' }
        }

        return {
            sucess: true,
            mensagem: 'Ficha deletada com sucesso'
        }

    }
}

module.exports = FichasDAO