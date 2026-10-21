const express = require('express')

const router = express.Router()
const fichaController = require('../controllers/FichaController')
const validateUsuario = require('../middleware/validateUsuario')

router.post('/cadastrar', validateUsuario.validateUsuario, fichaController.cadastrarFicha)
router.get('/listar', validateUsuario.validateUsuario, fichaController.listarFicha)
router.patch('/editar', validateUsuario.validateUsuario, fichaController.editarFicha)
router.delete('/remover', validateUsuario.validateUsuario, fichaController.removerFicha)

module.exports = router