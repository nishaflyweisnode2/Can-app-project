const express = require('express');
const router = express.Router();
const { createProfession } = require('../controller/professionController');



router.post('/create', createProfession);


module.exports = router;
