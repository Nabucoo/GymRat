const express = require('express')

const router = express.Router()
const fichaController = require('../controllers/FichaController')
const validateUsuario = require('../middleware/validateUsuario')

router.post('/cadastrar', validateUsuario.validateUsuario, fichaController.cadastrarFicha)
router.get('/listar', validateUsuario.validateUsuario, fichaController.listarFicha)
router.patch('/editar', validateUsuario.validateUsuario, fichaController.editarFicha)
router.delete('/:id', validateUsuario.validateUsuario, fichaController.removerFicha)
router.get('/:id', validateUsuario.validateUsuario, fichaController.getFicha)

module.exports = router