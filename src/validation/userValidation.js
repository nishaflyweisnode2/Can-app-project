const Joi = require('joi');
const mongoose = require('mongoose');


module.exports.updateUserValidation = Joi.object({
    userId: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.isValidObjectId(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        })
        .required(),
    name: Joi.string().required(),
    nowDoing: Joi.string().required()
});

