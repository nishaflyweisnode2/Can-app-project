const express = require('express');
const router = express.Router();
const { createPage } = require('../controller/pageController');



router.post('/create', createPage);



module.exports = router;
