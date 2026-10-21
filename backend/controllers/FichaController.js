const fichasDAO = require('../daos/FichasDAO')
const Ficha = require('../models/Ficha')
const Exercicio = require('../models/Exercicio')

const modelarFicha = (linha) => new Ficha(linha.id_ficha, linha.nome, linha.descricao)

const fichaController = {
    async cadastrarFicha(req, res) {
        if (!req.body) {
            return res.status(400).json({ 'mensagem': "Campo inválido!" })
        }

        const id = req.user.id
        const nome = req.body.nome
        const descricao = req.body.descricao

        if (typeof nome != "string") {
            return res.status(400).json({ 'mensagem': "Campo inválido!" })
        }

        if (!nome) {
            return res.status(400).json({ 'mensagem': "Campo inválido!" })
        }

        try {
            const resultado = await fichasDAO.criarFicha(nome.trim(), descricao, id)
            return res.status(201).json({ ficha: modelarFicha(resultado.dados) })
        } catch (e) {
            return res.status(500).json({ 'mensagem': "Não foi possível concluir o cadastro de ficha!" })
        }
    },

    async listarFicha(req, res) {
        const id = req.user.id
        try {
            const resultado = await fichasDAO.listarFichasPorUsuario(id)
            const fichas = resultado.dados.map(modelarFicha)
            return res.status(200).json({ fichas })
        } catch (e) {
            return res.status(500).json({ 'mensagem': "Não foi possível concluir a listagem de fichas!" })
        }
    },

    async editarFicha(req, res) {
        const id = req.user.id

        if (!req.body || (!req.body.nome & !req.body.descricao) || !req.body.id_ficha) {
            return res.status(400).json({ 'mensagem': "Campo inválido!" })
        }
        const id_ficha = req.body.id_ficha
        const nome = typeof req.body.nome === 'string' ? req.body.nome.trim() : undefined
        const descricao = req.body.descricao

        try {
            const resultado = await fichasDAO.atualizarFicha(nome, descricao, id, id_ficha)
            if (!resultado.sucess) return res.status(404).json({ mensagem: resultado.mensagem })
            return res.status(200).json({ ficha: modelarFicha(resultado.dados) })
        } catch (e) {
            return res.status(500).json({ 'mensagem': "Não foi possível editar a ficha" })
        }
    },

    async removerFicha(req, res) {
        const id = req.user.id
        const id_ficha = req.params.id

        if (!id_ficha) {
            return res.status(400).json({ 'mensagem': "Campo inválido!" })
        }

        try {
            const resultado = await fichasDAO.removerFicha(id_ficha, id)
            if (!resultado.sucess) return res.status(404).json({ mensagem: resultado.mensagem })
            return res.status(200).json({ ficha: modelarFicha(resultado.dados) })
        } catch (e) {
            return res.status(500).json({ 'mensagem': "Não foi possível remover a ficha!" })
        }
    },

    async getFicha(req, res) {
        const id_ficha = req.params.id
        if (!id_ficha) {
            return res.status(400).json({ mensagem: 'Campo inválido!' })
        }

        try {
            const resultado = await fichasDAO.getFicha(id_ficha, req.user.id)
            if (!resultado.sucess) {
                return res.status(404).json({ mensagem: resultado.mensagem })
            }

            const linhas = resultado.dados
            const exercicios = linhas
                .filter(linha => linha.id_exercicio !== null)
                .map(linha => new Exercicio(
                    linha.id_exercicio,
                    linha.exercicio_nome,
                    linha.carga,
                    linha.series,
                    linha.repeticoes,
                    linha.grupo_muscular
                ))

            const ficha = new Ficha(
                linhas[0].id_ficha,
                linhas[0].ficha_nome,
                linhas[0].descricao,
                exercicios
            )

            return res.status(200).json({ ficha })
        } catch (e) {
            return res.status(500).json({ mensagem: 'Não foi possível buscar a ficha!' })
        }
    }
}

module.exports = fichaController
