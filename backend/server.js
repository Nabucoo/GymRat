const express = require('express')

const app = express()
app.use(express.json())

//definindo rotas
const usuarioRoutes = require('./routes/usuarioRoutes')
const fichasRoutes = require('./routes/fichaRoutes')

app.use('/api/v1/usuario', usuarioRoutes)
app.use('/api/v1/fichas', fichasRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Backend ouvindo na porta ${port}`)
})
