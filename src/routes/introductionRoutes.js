const express = require('express');
const router = express.Router();

const { createIntroduction, updateIntroduction } = require('../controller/introductionController');


router.post('/introductions', createIntroduction);

router.put('/introductions/:introductionId', updateIntroduction);


module.exports = router;
