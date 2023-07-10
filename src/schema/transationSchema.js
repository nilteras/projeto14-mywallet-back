import Joi from "joi";

export const schemaNovaTransacao = Joi.object({
    valor: Joi.number().positive().required(),
    descricao: Joi.string().required()
});