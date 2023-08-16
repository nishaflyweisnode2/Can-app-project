const Joi = require('joi');


const createProfileValidation = Joi.object({
    image: Joi.string(),
    name: Joi.string().required(),
    text: Joi.string(),
    profession: Joi.string(),
    location: Joi.object({
        state: Joi.string().optional(),
        district: Joi.string().required(),
        place: Joi.string().required(),
    }),
    taps: Joi.object({
        tap1: Joi.array().items(Joi.string()),
        tap2: Joi.array().items(Joi.string()),
    }),
    managePages: Joi.array().items(Joi.string()),
    permission: Joi.boolean().required(),
});



module.exports = { createProfileValidation };
