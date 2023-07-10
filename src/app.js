import express from 'express';
import cors from 'cors'
import userRouter from './routes/authroutes.js';
import transationRouter from './routes/transationRoutes.js';


const app = express();
app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(transationRouter)

const PORT = 5000;
app.listen(PORT, () => console.log("Running server on port 5000"));