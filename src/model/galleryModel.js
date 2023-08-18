const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    uploadImage: {
        type: [String],
        default: [],
    },
    uploadVideo: {
        type: [String],
        default: [],
    },
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
