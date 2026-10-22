const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/UsuarioController')
const { validateUsuario } = require('../middleware/validateUsuario')

router.post('/cadastrar', usuarioController.inserirUsuario)
router.post("/logar", usuarioController.entrarUsuario)
router.delete('/remover', validateUsuario, usuarioController.removerUsuario)

module.exports = router
