const Post = require('../model/postModel');

const { createPostValidation } = require('../validation/postValidation');


const createPost = async (req, res) => {
    try {
        const { chooseProfile, upload, choosePostCategory, title, description } = req.body;

        const { error } = createPostValidation.validate({
            chooseProfile,
            upload,
            choosePostCategory,
            title,
            description,
        });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const post = new Post({
            chooseProfile,
            upload,
            choosePostCategory,
            title,
            description,
        });

        await post.save();

        return res.status(201).json({
            message: 'Post created successfully',
            post,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create post' });
    }
};

module.exports = {
    createPost,
};
