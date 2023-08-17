
const Joi = require('joi');


module.exports.addBrochureValidation = Joi.object({
    create: Joi.string().required(),
});


