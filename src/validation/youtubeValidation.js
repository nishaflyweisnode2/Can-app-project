const Joi = require('joi');
const mongoose = require('mongoose');



module.exports.addYoutubeUrlValidation = Joi.object({
    url: Joi.string()
        .required()
        .pattern(new RegExp(/^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}$/))
        .message('Please provide a valid YouTube URL'),
});



module.exports.updateYoutubeUrlValidation = Joi.object({
    youtubeId: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.isValidObjectId(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        })
        .required(),
    url: Joi.string()
        .required()
        .pattern(new RegExp(/^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}$/))
        .message('Please provide a valid YouTube URL'),
});

