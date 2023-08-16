const Joi = require('joi');




module.exports.createPageValidation = Joi.object({
    introduction: Joi.string(),
    status: Joi.string(),
    resume: Joi.string(),
    vision: Joi.string(),
    aim: Joi.string(),
    experience: Joi.string(),
    skills: Joi.string(),
    achievements: Joi.string(),
    timeline: Joi.string(),
    brochure: Joi.string(),
    menu: Joi.string(),
    donate: Joi.string(),
    appointment: Joi.string(),
    instagram: Joi.string(),
    youtube: Joi.string(),
    website: Joi.string(),
    call: Joi.string(),
    contactMe: Joi.string(),
    buyNow: Joi.string(),
    payNow: Joi.string(),
    gallery: Joi.string(),
    portfolio: Joi.string(),
    pitchDeck: Joi.string(),
    // Add more validation rules for additional fields
});

