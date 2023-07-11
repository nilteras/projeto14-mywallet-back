import { db } from '../database/database.connection.js'
import dayjs from 'dayjs'
import { v4 as uuid } from 'uuid'

const date = dayjs().format("DD/MM")

export async function novaTransacao(req, res, token) {

    const { valor, descricao } = req.body

    try {

        const usuarioLogado = await db.collection('sessao').findOne({ token })

        if (!usuarioLogado) return res.status(401).send("Não autorizado")

        const usuarioInfo = await db.collection('usuarios').findOne({ _id: usuarioLogado.idUsuario })

        const saldoTotal = req.params.tipo === 'entrada' ?
            Number(usuarioInfo.saldo) + Number(valor) :
            Number(usuarioInfo.saldo) - Number(valor)

        await db.collection('usuarios').updateOne(
            { _id: usuarioLogado.idUsuario },
            {
                $set: {
                    transacoes: [...usuarioInfo.transacoes, { ...req.body, tipo: req.params.tipo, data: date, id: uuid() }],
                    saldo: saldoTotal
                }
            })
        return res.sendStatus(201)

    } catch (err) {
        console.log(err.message)
        return res.status(500).send(err.message)
    }

}

export async function listarExtrato(req, res, token) {
    console.log(token)
    try {
        const usuarioLogado = await db.collection('sessao').findOne({ token })
      
        const usuarioInfo = await db.collection('usuarios').findOne({ _id: usuarioLogado.idUsuario })
        
        return res.status(200).send(
            {
                transacoes: usuarioInfo.transacoes,
                saldo: usuarioInfo.saldo,
                nome: usuarioInfo.nome
            })


    } catch (err) {
        console.log(err.message)
        return res.status(500).send(err.message)
    }
}

export async function efetuarLogout(req, res) {

    try {

        await db.collection('sessao').deleteMany({})
        
        return res.sendStatus(200)

    } catch (err) {
        console.log(err.message)
        return res.status(500).send(err.message)
    }
}