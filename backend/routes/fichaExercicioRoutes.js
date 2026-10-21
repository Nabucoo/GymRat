const express = require('express')
const router = express.Router()
const fichaExercicioController = require('../controllers/FichaExercicioController')
const { validateUsuario } = require('../middleware/validateUsuario')

router.post('/:id_ficha/:id_exercicio', validateUsuario, fichaExercicioController.adicionarExercicioAFicha)
router.delete('/:id_ficha/:id_exercicio', validateUsuario, fichaExercicioController.removerExercicioDaFicha)

module.exports = router
