const express = require('express');
const router = express.Router();

const { createVision, updatVision } = require('../controller/visionController');


router.post('/create', createVision);

router.put('/:experienceId', updatVision);



module.exports = router;
