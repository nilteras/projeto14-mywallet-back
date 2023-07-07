export async function authValidate(req, res, next) {
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")

    if (!token) return res.sendStatus(401)

    try {
        const sessao = await db.collection("sessao").findOne({ token })
        if (!sessao) return res.sendStatus(401)
      
        next()

    } catch (err) {
        res.status(500).send(err.message)
    }
}