// brochureModel.js

const mongoose = require('mongoose');

const brochureSchema = new mongoose.Schema({
    create: {
        type: String,
    },
    fileUrl: {
        type: String,
    },
    filename: {
        type: String,
    },
});

const Brochure = mongoose.model('Brochure', brochureSchema);

module.exports = Brochure;
