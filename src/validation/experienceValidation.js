const Joi = require('joi');


const experienceValidation = Joi.object({
    description: Joi.string().required(),
});


module.exports = experienceValidation;
