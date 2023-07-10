import { db } from './../database/database.connection.js'

export async function authValidate(req, res, next) {
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")

    if (!token) return res.sendStatus(401)

    try {
        const sessao = await db.collection("sessao").findOne({ token })
        if (!sessao) return res.status(401).send("Usuário não esta logado")
      
        next()

    } catch (err) {
        res.status(500).send(err.message)
    }
}