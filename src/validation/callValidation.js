const Joi = require('joi');
const mongoose = require('mongoose');



module.exports.makeCallValidation = Joi.object({
    mobileNumber: Joi.string().required(),
    setCallTimings: Joi.object({
        anyTime: Joi.boolean().required(),
        customizeTimings: Joi.object({
            setDays: Joi.array().items(Joi.string()),
            setTiming: Joi.string(),
        }).when('anyTime', { is: false, then: Joi.required() }),
    }).required(),
});



module.exports.editCallValidation = Joi.object({
    callId: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.isValidObjectId(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        })
        .required(),
    mobileNumber: Joi.string().required(),
    setCallTimings: Joi.object({
        anyTime: Joi.boolean().required(),
        customizeTimings: Joi.object({
            setDays: Joi.array().items(Joi.string()),
            setTiming: Joi.string(),
        }).when('anyTime', { is: false, then: Joi.required() }),
    }).required(),
});

