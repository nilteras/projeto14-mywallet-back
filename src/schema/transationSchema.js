import Joi from "joi";

export const schemaNovaTransacao = Joi.object({
    value: Joi.number().positive().required(),
    description: Joi.string().required()
});