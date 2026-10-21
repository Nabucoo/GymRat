const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/UsuarioController')

router.post('/cadastrar', usuarioController.inserirUsuario)
router.post("/logar", usuarioController.entrarUsuario)

module.exports = router