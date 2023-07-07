import { Router } from "express";
import { signin, signup } from "../controllers/authController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemaCadastro, schemaLogin } from "../schema/authSchema.js";

const userRouter = Router();

userRouter.post("/cadastro", validateSchema(schemaCadastro),signup);
userRouter.post("/", validateSchema(schemaLogin), signin);

export default userRouter;