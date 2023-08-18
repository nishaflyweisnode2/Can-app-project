const express = require('express');
const router = express.Router();
const { createCategory } = require('../controller/categoryController');



// Create a new category
router.post('/categories', createCategory);



module.exports = router;
