const exercicioDAO = require('../daos/ExercicioDAO')

const exercicioController = {
    async inserirExercicio(req, res) {
        const { nome, grupo_muscular, carga, series, repeticoes } = req.body || {}
        if (typeof nome !== 'string' || !nome.trim() || typeof grupo_muscular !== 'string' || !grupo_muscular.trim() ||
            carga === undefined || series === undefined || repeticoes === undefined ||
            !Number.isFinite(Number(carga)) || !Number.isInteger(Number(series)) || !Number.isInteger(Number(repeticoes))) {
            return res.status(400).json({ mensagem: 'Campos inválidos!' })
        }

        try {
            const exercicio = await exercicioDAO.criarExercicio(
                nome.trim(), grupo_muscular.trim(), Number(carga), Number(series), Number(repeticoes), req.user.id
            )
            return res.status(201).json({ exercicio })
        } catch (e) {
            return res.status(500).json({ mensagem: 'Não foi possível cadastrar o exercício!' })
        }
    },

    async listarExercicios(req, res) {
        try {
            const exercicios = await exercicioDAO.listarExercicios(req.user.id)
            return res.status(200).json({ exercicios })
        } catch (e) {
            return res.status(500).json({ mensagem: 'Não foi possível listar os exercícios!' })
        }
    },

    async buscarExercicio(req, res) {
        const id_exercicio = req.params.id || (req.body && req.body.id_exercicio)
        if (!id_exercicio) return res.status(400).json({ mensagem: 'Campo inválido!' })

        try {
            const resultado = await exercicioDAO.buscarExercicioPorId(id_exercicio, req.user.id)
            if (!resultado.sucesso) return res.status(404).json({ mensagem: resultado.mensagem })
            return res.status(200).json({ exercicio: resultado.exercicio })
        } catch (e) {
            return res.status(500).json({ mensagem: 'Não foi possível buscar o exercício!' })
        }
    },

    async editarExercicio(req, res) {
        const { id_exercicio, nome, grupo_muscular, carga, series, repeticoes } = req.body || {}
        if (!id_exercicio || typeof nome !== 'string' || !nome.trim() || typeof grupo_muscular !== 'string' || !grupo_muscular.trim() ||
            carga === undefined || series === undefined || repeticoes === undefined ||
            !Number.isFinite(Number(carga)) || !Number.isInteger(Number(series)) || !Number.isInteger(Number(repeticoes))) {
            return res.status(400).json({ mensagem: 'Campos inválidos!' })
        }

        try {
            const resultado = await exercicioDAO.atualizarExercicio(
                id_exercicio, nome.trim(), grupo_muscular.trim(), Number(carga), Number(series), Number(repeticoes), req.user.id
            )
            if (!resultado.sucesso) return res.status(404).json({ mensagem: resultado.mensagem })
            return res.status(200).json({ exercicio: resultado.exercicio })
        } catch (e) {
            return res.status(500).json({ mensagem: 'Não foi possível editar o exercício!' })
        }
    },

    async removerExercicio(req, res) {
        const id_exercicio = (req.body && req.body.id_exercicio) || req.params.id
        if (!id_exercicio) return res.status(400).json({ mensagem: 'Campo inválido!' })

        try {
            const resultado = await exercicioDAO.removerExercicio(id_exercicio, req.user.id)
            if (!resultado.sucesso) return res.status(404).json({ mensagem: resultado.mensagem })
            return res.status(200).json({ mensagem: resultado.mensagem })
        } catch (e) {
            return res.status(500).json({ mensagem: 'Não foi possível remover o exercício!' })
        }
    }
}

module.exports = exercicioController