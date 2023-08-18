const Joi = require('joi');
const mongoose = require('mongoose');

const createAppointmentValidation = Joi.object({
    name: Joi.string().required(),
    mobileNumber: Joi.string().pattern(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/).required(),
    emailId: Joi.string().email().required(),
    message: Joi.string().required(),
});

const updateAppointmentValidation = Joi.object({
    appointmentId: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.isValidObjectId(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        })
        .required(),
    name: Joi.string().required(),
    mobileNumber: Joi.string().pattern(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/).required(),
    emailId: Joi.string().email().required(),
    message: Joi.string().required(),
});

module.exports = {
    createAppointmentValidation,
    updateAppointmentValidation
};
