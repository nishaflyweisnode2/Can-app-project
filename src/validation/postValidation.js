const Joi = require('joi');


const createPostValidation = Joi.object({
    chooseProfile: Joi.string().required(),
    upload: {
        image: Joi.array().items(Joi.string().uri()),
        video: Joi.array().items(Joi.string().uri()),
    },
    choosePostCategory: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
});


module.exports = {
    createPostValidation,
};
