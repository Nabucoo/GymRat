const medidasDAO = require('../daos/MedidasDAO')

const medidasController = {
    async inserirMedida(req, res) {
        const { altura, peso, data } = req.body || {}

        if (!req.body ||
            altura === undefined || altura === null || altura === '' ||
            !Number.isFinite(Number(altura)) || Number(altura) <= 0 ||
            peso === undefined || peso === null || peso === '' ||
            !Number.isFinite(Number(peso)) || Number(peso) <= 0 ||
            !data || Number.isNaN(Date.parse(data))
        ) {
            return res.status(400).json({ mensagem: 'Campo inválido!' })
        }

        try {
            const medida = await medidasDAO.criarMedida(req.user.id, altura, peso, data)
            return res.status(201).json({ mensagem: 'Medida cadastrada com sucesso!', medida })
        } catch (e) {
            return res.status(500).json({ mensagem: 'Não foi possível concluir o cadastro de medida!' })
        }
    }

    async buscarMedida(req, res) {
        const idMedida = req.params ? .id_medida || req.body ? .id_medida

        if (!Number.isInteger(Number(idMedida)) || Number(idMedida) <= 0) {
            return res.status(400).json({ mensagem: 'Campo inválido!' })
        }

        try {
            const medida = await medidasDAO.buscarMedidaPorId(Number(idMedida))
            if (medida.sucesso === false) {
                return res.status(404).json({ mensagem: medida.mensagem })
            }
            return res.status(200).json({ medida })
        } catch (e) {
            return res.status(500).json({ mensagem: 'Não foi possível buscar a medida!' })
        }
    }

    async editarMedida(req, res) {
        const { id_medida: idMedida, altura, peso, data } = req.body || {}

        if (!Number.isInteger(Number(idMedida)) || Number(idMedida) <= 0 ||
            altura === undefined || altura === null || altura === '' ||
            !Number.isFinite(Number(altura)) || Number(altura) <= 0 ||
            peso === undefined || peso === null || peso === '' ||
            !Number.isFinite(Number(peso)) || Number(peso) <= 0 ||
            !data || Number.isNaN(Date.parse(data))
        ) {
            return res.status(400).json({ mensagem: 'Campo inválido!' })
        }

        try {
            const medida = await medidasDAO.atualizarMedida(Number(idMedida), altura, peso, data)
            if (medida.sucesso === false) {
                return res.status(404).json({ mensagem: medida.mensagem })
            }
            return res.status(200).json({ mensagem: 'Medida editada com sucesso!', medida })
        } catch (e) {
            return res.status(500).json({ mensagem: 'Não foi possível editar a medida!' })
        }
    }

    async removerMedida(req, res) {
        const idMedida = req.params ? .id_medida || req.body ? .id_medida

        if (!Number.isInteger(Number(idMedida)) || Number(idMedida) <= 0) {
            return res.status(400).json({ mensagem: 'Campo inválido!' })
        }

        try {
            const resultado = await medidasDAO.removerMedida(Number(idMedida))
            if (resultado.sucesso === false) {
                return res.status(404).json({ mensagem: resultado.mensagem })
            }
            return res.status(204).json({ mensagem: resultado.mensagem })
        } catch (e) {
            return res.status(500).json({ mensagem: 'Não foi possível remover a medida!' })
        }
    }
}

module.exports = medidasController