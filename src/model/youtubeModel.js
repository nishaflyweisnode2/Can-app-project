const mongoose = require('mongoose');

const youtubeSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true,
    },
});

const Youtube = mongoose.model('Youtube', youtubeSchema);

module.exports = Youtube;
