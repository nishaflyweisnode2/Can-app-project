const express = require('express');
const router = express.Router();

const { createPost, updateImages, updateVideos } = require('../controller/postController');

// Create a new post
router.post('/posts', createPost);

router.put('/update-images/:postId', updateImages);
router.put('/update-video/:postId', updateVideos);


module.exports = router;
