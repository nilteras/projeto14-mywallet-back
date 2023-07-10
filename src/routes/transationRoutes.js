import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemaNovaTransacao } from "../schema/transationSchema.js";
import { novaTransacao } from "../controllers/transationController.js";

const transationRouter = Router();

transationRouter.post("/nova-transacao/:tipo", validateSchema(schemaNovaTransacao), novaTransacao);

export default transationRouter;

