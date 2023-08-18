const mongoose = require('mongoose');

const instagramSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true,
    },
});

const Instagram = mongoose.model('Instagram', instagramSchema);

module.exports = Instagram;
