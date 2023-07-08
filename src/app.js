import express from 'express';
import cors from 'cors'
import userRouter from './routes/authroutes.js';
import { db } from './database/database.connection.js';


const app = express();
app.use(cors())
app.use(express.json())
app.use(userRouter)


app.get("/usuario-logado", async (req, res) => {
    try {
        const users = await db.collection('usuarios').find().toArray()
        res.status(200).send(users)
    } catch (err) {
        res.status(500).send(err.message)
    }

})

const PORT = 5000;
app.listen(PORT, () => console.log("Running server on port 5000"));