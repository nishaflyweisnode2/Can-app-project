const Joi = require('joi');
const mongoose = require('mongoose');


module.exports.createChooseProfessionValidation = Joi.object({
    profession: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.isValidObjectId(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        })
        .required(),
    name: Joi.string().required(),
});
