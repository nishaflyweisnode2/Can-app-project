const Joi = require('joi');
const mongoose = require('mongoose');

const createPostValidation = Joi.object({
    chooseProfile: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.isValidObjectId(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        })
        .required(),
    upload: Joi.object({
        image: Joi.array().items(Joi.string().uri()),
        video: Joi.array().items(Joi.string().uri()),
    }),
    choosePostCategory: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.isValidObjectId(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        })
        .required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
});



module.exports = {
    createPostValidation,
};
