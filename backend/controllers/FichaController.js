const fichasDAO = require('../daos/FichasDAO')
const Ficha = require('../models/Ficha')

const fichaController = {
    async cadastrarFicha(req, res) {
        if (!req.body) {
            return res.status(400).json({ 'mensagem': "Campo inválido!" })
        }

        const id = req.user.id
        const nome = req.body.nome.trim()
        const descricao = req.body.descricao

        if (typeof nome != "string") {
            return res.status(400).json({ 'mensagem': "Campo inválido!" })
        }

        if (!nome) {
            return res.status(400).json({ 'mensagem': "Campo inválido!" })
        }

        try {
            await fichasDAO.criarFicha(nome, descricao, id)
            return res.status(201).json({ 'mensagem': "Ficha Cadastrada com sucesso!" })
        } catch (e) {
            return res.status(500).json({ 'mensagem': "Não foi possível concluir o cadastro de ficha!" })
        }
    },

    async listarFicha(req, res) {
        const id = req.user.id
        try {
            fichas = await fichasDAO.listarFichasPorUsuario(id)
            return res.status(200).json({ "fichas": fichas })
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
        const nome = req.body.nome.trim()
        const descricao = req.body.descricao

        try {
            await fichasDAO.atualizarFicha(nome, descricao, id, id_ficha)
            return res.status(204).json({ "mensagem": "Ficha editada com sucesso!" })
        } catch (e) {
            return res.status(500).json({ 'mensagem': "Não foi possível editar a ficha" })
        }
    },

    async removerFicha(req, res) {
        const id = req.user.id
        const id_ficha = req.body.id_ficha

        if (!id_ficha) {
            return res.status(400).json({ 'mensagem': "Campo inválido!" })
        }

        try {
            resposta = await fichasDAO.removerFicha(id_ficha, id)
            return res.status(204).json({
                resposta
            })
        } catch (e) {
            return res.status(500).json({ 'mensagem': "Não foi possível remover a ficha!" })
        }
    }
}

module.exports = fichaController