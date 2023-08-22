const Post = require('../model/postModel');
const ProfileDb = require('../model/profileModel');
const Category = require('../model/categoryModel');


const { createPostValidation } = require('../validation/postValidation');


//Start
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure cloudinary
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

// Start Image
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "cannapp/image",
        allowed_formats: ["jpg", "jpeg", "png", "xlsx", "xls", "pdf", "PDF", 'mp4', 'mov', 'avi'],
    },
});

const fieldsToUpload = [
    { name: 'image', maxCount: 3 }
]

const upload = multer({ storage: storage }).fields(fieldsToUpload);
// End image


// Start video 
const storage1 = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "videos",
        resource_type: "video",
        allowed_formats: ['mp4', 'mov', 'avi'],
    },
});

const fieldsToUpload1 = [
    { name: 'video', maxCount: 3 }
];

const upload1 = multer({ storage: storage1 }).fields(fieldsToUpload1);
// End video


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
        const checkProfile = await ProfileDb.findById(chooseProfile);
        if (!checkProfile) {
            return res.status(404).json({ status: 404, message: 'No Profile found with this Id' });
        }
        const checkCategory = await Category.findById(choosePostCategory);
        if (!checkCategory) {
            return res.status(404).json({ status: 404, message: 'No checkCategory found with this Id' });
        }

        const post = new Post({
            chooseProfile,
            upload,
            choosePostCategory,
            title,
            description,
        });

        await post.save();

        const populatedPost = await Post.findById(post._id)
            .populate('chooseProfile')
            .populate('choosePostCategory');

        return res.status(201).json({
            message: 'Post created successfully',
            post: populatedPost,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create post' });
    }
};


const updateImages = async (req, res) => {
    try {
        await upload(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ error: 'Error uploading images', err });
            } else if (err) {
                return res.status(500).json({ error: 'An unknown error occurred', err });
            }

            const postId = req.params.postId;

            const updates = {};

            if (req.files['image']) {
                updates['upload.image'] = req.files['image'][0].path;
            }

            const post = await Post.findByIdAndUpdate(
                postId,
                { $set: updates },
                { new: true }
            );

            if (!post) {
                return res.status(404).json({ status: 404, message: 'Post Id not found' });
            }

            return res.status(200).json({
                status: 200,
                message: 'Images updated successfully',
                user: post
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to update images' });
    }
};


const updateVideos = async (req, res) => {
    try {
        await upload1(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ error: 'Error uploading videos', err });
            } else if (err) {
                return res.status(500).json({ error: 'An unknown error occurred', err });
            }

            const postId = req.params.postId;

            const updates = {};

            if (req.files['video']) {
                updates['upload.video'] = req.files['video'][0].path;
            }

            const post = await Post.findByIdAndUpdate(
                postId,
                { $set: updates },
                { new: true }
            );

            if (!post) {
                return res.status(404).json({ status: 404, message: 'post Id not found' });
            }

            return res.status(200).json({
                status: 200,
                message: 'Videos updated successfully',
                user: post
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to update videos' });
    }
};




module.exports = {
    createPost,
    updateImages,
    updateVideos
};
