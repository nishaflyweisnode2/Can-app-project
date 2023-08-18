const Joi = require('joi');

const createCategoryValidation = Joi.object({
    name: Joi.string().required(),
});


module.exports = {
    createCategoryValidation,
};
