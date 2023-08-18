const Joi = require('joi');


const galleryImageValidation = Joi.object({
    url: Joi.array().items(Joi.string().uri()).required()
});

const galleryVideoValidation = Joi.object({
    url: Joi.array().items(Joi.string().uri()).required()
});




module.exports = {
    galleryImageValidation,
    galleryVideoValidation
};
