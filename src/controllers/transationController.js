import { db } from '../database/database.connection.js'
import dayjs from 'dayjs'

const date = dayjs().format("DD/MM")

export async function novaTransacao(req, res){

    const { valor, descricao } = req.body
    
    const token = req.headers.authorization;
    if(!token) return res.sendStatus(401)

    try{
        const usuarioLogado = await db.collection('sessao').findOne({token: token.replace('Bearer', '')})
        if(!usuarioLogado) return res.status(401).send("Usuário não esta logado")

        const usuarioInfo = await db.collection('usuarios').findOne({ _id: usuarioLogado.idUsuario })

        const saldoTotal = req.params.tipo === 'entrada' ? 
        Number(usuarioInfo.saldo) + Number(valor) :
        Number(usuarioInfo.saldo) - Number(valor);

        await db.collection('usuarios').updateOne(
            {_id: usuarioLogado.idUsuario}, 
            { $set: {
                transacoes: [...usuarioInfo.transacoes, {...req.body, tipo: req.params.tipo, data: date }],
                saldo: saldoTotal 
            }} )
        return res.sendStatus(201);

    } catch (err) {
        console.log(err.message)
        return res.status(500).send(err.message)
    }

}