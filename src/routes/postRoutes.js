const express = require('express');
const router = express.Router();

const { createPost } = require('../controller/postController');

// Create a new post
router.post('/posts', createPost);


module.exports = router;
