import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { db } from '../database/database.connection.js'


export async function signup(req, res) {

    const { nome, email, senha } = req.body


    try {
        const userExist = await db.collection('usuarios').findOne({ email: email })
        if (userExist) return res.status(409).send('Email já cadastrado')

        const hash = bcrypt.hashSync(senha, 10)

        await db.collection('usuarios').insertOne({ nome, email, senha: hash, saldo: 0, transacoes: [] })
        res.sendStatus(201)
    } catch (err) {
        res.sendStatus(500)
    }
}

export async function signin(req, res) {
    const { email, senha } = req.body

    try {
        const usuario = await db.collection('usuarios').findOne({ email })
        if (!usuario) return res.status(404).send('Usuario não cadastrado')

        const passwordCorrect = bcrypt.compareSync(senha, usuario.senha)
        if (!passwordCorrect) return res.status(401).send('Senha incorreta')

        const token = uuid()
        await db.collection("sessao").insertOne({ token, idUsuario: usuario._id })

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
    }
}