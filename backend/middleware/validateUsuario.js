const supabase = require('../services/supabaseClient')

async function validateUsuario(req, res, next) {
    const auth = req.headers.authorization
    if (!auth) {
        return res.status(401).json({"mensagem": "Token inválido!"})
    }

    const token = auth.split(" ")[1]

    const {data, error } = await supabase.auth.getUser(token)

    if (error || !data.user) {
        return res.status(401).json({"mensagem": "Usuário não válidado!"})
    }

    req.user = data.user
    next()
}

module.exports = {validateUsuario}