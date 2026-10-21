const express = require('express')

const app = express()
app.use(express.json())

//definindo rotas
const usuarioRoutes = require('./routes/usuarioRoutes')
const fichasRoutes = require('./routes/fichaRoutes')
const exercicioRoutes = require('./routes/exercicioRoutes')
const fichaExecicioRoutes = require('./routes/fichaExercicioRoutes')
const medidasRoutes = require('./routes/medidasRoutes')

app.use('/api/v1/usuario', usuarioRoutes)
app.use('/api/v1/fichas', fichasRoutes)
app.use('/api/v1/exercicio', exercicioRoutes)
app.use('/api/v1/ficha_exercicio', fichaExecicioRoutes)
app.use('/api/v1/medidas', medidasRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Backend ouvindo na porta ${port}`)
})
