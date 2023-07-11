import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemaNovaTransacao } from "../schema/transationSchema.js";
import { listarExtrato, novaTransacao } from "../controllers/transationController.js";
import { authValidate } from "../middlewares/authValidate.js";

const transationRouter = Router();

transationRouter.post("/nova-transacao/:tipo", authValidate, validateSchema(schemaNovaTransacao), novaTransacao);
transationRouter.get("/home",authValidate, listarExtrato);

export default transationRouter;

