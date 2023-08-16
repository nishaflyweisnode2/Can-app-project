const express = require('express');
const router = express.Router();
const { createChooseProfession } = require('../controller/chooseProfessionController');



router.post('/create', createChooseProfession);


module.exports = router;
