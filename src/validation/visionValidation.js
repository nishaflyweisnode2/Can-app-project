const Joi = require('joi');


const visionValidation = Joi.object({
    description: Joi.string().required(),
});


module.exports = visionValidation;
