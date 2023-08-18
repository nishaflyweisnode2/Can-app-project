const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    chooseProfile: {
        type: String,
        required: true,
    },
    upload: {
        image: [{
            type: String,
        }],
        video: [{
            type: String,
        }],
    },
    choosePostCategory: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
