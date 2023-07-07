import express from 'express';
import cors from 'cors'
import userRouter from './routes/authroutes.js';


const app = express();
app.use(cors())
app.use(express.json())
app.use(userRouter)


app.get("/usuario-logado", async (req, res) => {
   



})

const PORT = 5000;
app.listen(PORT, () => console.log("Running server on port 5000"));