const Joi = require('joi');
const mongoose = require('mongoose');



module.exports.profileValidation = Joi.object({
    image: Joi.string().allow(''),
    name: Joi.string().required(),
    text: Joi.string().allow(''),
    profession: Joi.string().custom((value, helpers) => {
        if (!mongoose.isValidObjectId(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    }).required(),
    location: Joi.object({
        state: Joi.string().default('India'),
        district: Joi.string().required(),
        place: Joi.string().required(),
    }),
    taps: Joi.object({
        tap1: Joi.array().items(Joi.string().custom((value, helpers) => {
            if (!mongoose.isValidObjectId(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        })).required(),
        tap2: Joi.array().items(Joi.string().custom((value, helpers) => {
            if (!mongoose.isValidObjectId(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        })).required(),
    }),
    managePages: Joi.array().items(Joi.string().custom((value, helpers) => {
        if (!mongoose.isValidObjectId(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    })).required(),
    permission: Joi.boolean().required(),
});




module.exports.updateProfileValidation = Joi.object({
    image: Joi.string().allow('').optional(),
    name: Joi.string().optional(),
    text: Joi.string().allow('').optional(),
    profession: Joi.string().custom((value, helpers) => {
        if (!mongoose.isValidObjectId(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    }).optional(),
    location: Joi.object({
        state: Joi.string().default('India'),
        district: Joi.string().optional(),
        place: Joi.string().optional(),
    }),
    taps: Joi.object({
        tap1: Joi.array().items(Joi.string().custom((value, helpers) => {
            if (!mongoose.isValidObjectId(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        })).optional(),
        tap2: Joi.array().items(Joi.string().custom((value, helpers) => {
            if (!mongoose.isValidObjectId(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        })).optional(),
    }),
    managePages: Joi.array().items(Joi.string().custom((value, helpers) => {
        if (!mongoose.isValidObjectId(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    })).optional(),
    permission: Joi.boolean().optional(),
});



module.exports.profileIdValidation = Joi.object({
    profileId: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.isValidObjectId(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        })
        .required(),
});
