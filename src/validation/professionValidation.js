const Joi = require('joi');


module.exports.createProfessionValidation = Joi.object({
    name: Joi.string().required(),
});
