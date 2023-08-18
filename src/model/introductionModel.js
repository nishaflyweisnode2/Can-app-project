const mongoose = require('mongoose');


const introductionSchema = new mongoose.Schema({
    introduction: {
        type: String,
        required: true,
    },
});

const Introduction = mongoose.model('Introduction', introductionSchema);

module.exports = Introduction;
