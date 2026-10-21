const express = require('express')
const router = express.Router()
const exercicioController = require('../controllers/ExercicioController')
const { validateUsuario } = require('../middleware/validateUsuario')

router.post('/cadastrar', validateUsuario, exercicioController.inserirExercicio)
router.get('/listar', validateUsuario, exercicioController.listarExercicios)
router.get('/categoria/:categoria', validateUsuario, exercicioController.getByCategoria)
router.get('/:id', validateUsuario, exercicioController.buscarExercicio)
router.patch('/editar', validateUsuario, exercicioController.editarExercicio)
router.delete('/:id', validateUsuario, exercicioController.removerExercicio)


module.exports = router
