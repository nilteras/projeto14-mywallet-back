import { db } from '../database/database.connection.js'
import dayjs from 'dayjs'

const date = dayjs().format("DD/MM")

export async function novaTransacao(req, res) {

    const { valor, descricao } = req.body

    const token = req.headers.authorization;

    try {
        const usuarioLogado = await db.collection('sessao').findOne({ token })
 
        const usuarioInfo = await db.collection('usuarios').findOne({ _id: usuarioLogado.idUsuario })
   
        const saldoTotal = req.params.tipo === 'entrada' ?
            Number(usuarioInfo.saldo) + Number(valor) :
            Number(usuarioInfo.saldo) - Number(valor)

        await db.collection('usuarios').updateOne(
            { _id: usuarioLogado.idUsuario },
            {
                $set: {
                    transacoes: [...usuarioInfo.transacoes, { ...req.body, tipo: req.params.tipo, data: date }],
                    saldo: saldoTotal
                }
            })
        return res.sendStatus(201)

    } catch (err) {
        console.log(err.message)
        return res.status(500).send(err.message)
    }

}

export async function listarExtrato(req, res) {

    const token = req.headers.authorization;

    try {
        const usuarioLogado = await db.collection('sessao').findOne({ token })

        const usuarioInfo = await db.collection('usuarios').findOne({ _id: usuarioLogado.idUsuario })
        console.log(usuarioInfo)

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