const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({

    description: {
        type: String,
        required: true,
    },

});

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;
