const Joi = require('joi');


const createIntroductionValidation = Joi.object({
    introduction: Joi.string().required(),
});


module.exports = {
    createIntroductionValidation,
};
