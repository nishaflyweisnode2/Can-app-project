const Joi = require('joi');
const mongoose = require('mongoose');



module.exports.websiteValidation = Joi.object({
    url: Joi.string().required().trim().pattern(new RegExp('^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$')),

});



module.exports.websiteUpdateValidation = Joi.object({
    websiteId: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.isValidObjectId(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        })
        .required(),
    url: Joi.string().required().trim().pattern(new RegExp('^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$')),
});



module.exports.websiteGetByIdValidation = Joi.object({
    websiteId: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.isValidObjectId(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        })
        .required(),
});

