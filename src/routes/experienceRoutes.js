const express = require('express');
const router = express.Router();

const { createExperience, updateExperience } = require('../controller/experienceController');


router.post('/create', createExperience);

router.put('/:experienceId', updateExperience);



module.exports = router;
