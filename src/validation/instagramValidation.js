const Joi = require('joi');
const mongoose = require('mongoose');


const isValidInstagramUrl = (value) => {
    const instagramUrlPattern = /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_\.]+(\/)?$/i;
    return instagramUrlPattern.test(value);
};


const addInstagramLinkValidation = Joi.object({
    url: Joi.string().required().custom(isValidInstagramUrl, 'Custom validation'),
});


const updateInstagramLinkValidation = Joi.object({
    instagramId: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.isValidObjectId(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        })
        .required(),
    url: Joi.string().required().custom(isValidInstagramUrl, 'Custom validation'),
});




module.exports = {
    addInstagramLinkValidation,
    updateInstagramLinkValidation
};
