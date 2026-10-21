const express = require('express')
const router = express.Router()
const medidasController = require('../controllers/MedidasController')
const { validateUsuario } = require('../middleware/validateUsuario')

router.post('/cadastrar', validateUsuario, medidasController.inserirMedida)
router.get('/:id_medida', validateUsuario, medidasController.buscarMedida)
router.patch('/editar', validateUsuario, medidasController.editarMedida)
router.delete('/:id_medida', validateUsuario, medidasController.removerMedida)


module.exports = router
