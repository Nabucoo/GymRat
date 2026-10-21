const fichaExercicioDAO = require('../daos/FichaExercicioDAO')
const fichasDAO = require('../daos/FichasDAO')
const Ficha = require('../models/Ficha')
const Exercicio = require('../models/Exercicio')

const modelarFicha = (linhas) => new Ficha(
    linhas[0].id_ficha,
    linhas[0].ficha_nome,
    linhas[0].descricao,
    linhas
        .filter(linha => linha.id_exercicio !== null)
        .map(linha => new Exercicio(
            linha.id_exercicio,
            linha.exercicio_nome,
            linha.carga,
            linha.series,
            linha.repeticoes,
            linha.grupo_muscular
        ))
)

const fichaExercicioController = {
    async adicionarExercicioAFicha(req, res) {
        const { id_ficha, id_exercicio } = req.params
        if (!id_ficha || !id_exercicio) {
            return res.status(400).json({ mensagem: 'IDs da ficha e do exercício são obrigatórios!' })
        }

        try {
            const fichaAntes = await fichasDAO.getFicha(id_ficha, req.user.id)
            if (!fichaAntes.sucess) {
                return res.status(404).json({ mensagem: fichaAntes.mensagem })
            }

            const vinculacao = await fichaExercicioDAO.adicionarExercicioAFicha(id_ficha, id_exercicio)
            if (!vinculacao.sucess) {
                return res.status(404).json({ mensagem: vinculacao.mensagem })
            }

            const resultado = await fichasDAO.getFicha(id_ficha, req.user.id)
            return res.status(201).json({ ficha: modelarFicha(resultado.dados) })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ mensagem: 'Não foi possível adicionar o exercício à ficha!' })
        }
    },

    async removerExercicioDaFicha(req, res) {
        const { id_ficha, id_exercicio } = req.params
        if (!id_ficha || !id_exercicio) {
            return res.status(400).json({ mensagem: 'IDs da ficha e do exercício são obrigatórios!' })
        }

        try {
            const fichaAntes = await fichasDAO.getFicha(id_ficha, req.user.id)
            if (!fichaAntes.sucess) {
                return res.status(404).json({ mensagem: fichaAntes.mensagem })
            }

            const vinculacao = await fichaExercicioDAO.removerExercicioDaFicha(id_ficha, id_exercicio)
            if (!vinculacao.sucess) {
                return res.status(404).json({ mensagem: vinculacao.mensagem })
            }

            const resultado = await fichasDAO.getFicha(id_ficha, req.user.id)
            return res.status(200).json({ ficha: modelarFicha(resultado.dados) })
        } catch (e) {
            return res.status(500).json({ mensagem: 'Não foi possível remover o exercício da ficha!' })
        }
    }
}

module.exports = fichaExercicioController
