const mongoose = require('mongoose');

const visionSchema = new mongoose.Schema({

    description: {
        type: String,
        required: true,
    },

});

const Vision = mongoose.model('Vision', visionSchema);

module.exports = Vision;
