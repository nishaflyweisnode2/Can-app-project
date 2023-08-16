const express = require('express');
const router = express.Router();
const { createProfile } = require('../controller/profileController');



router.post('/create', createProfile);



module.exports = router;
