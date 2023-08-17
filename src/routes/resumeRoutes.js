const express = require('express');
const router = express.Router();
const { createResume, editResume, updateImages, updateVideos, getResumeById } = require('../controller/resumeController');


router.post('/create', createResume);

router.put('/edit/:resumeId', editResume);

router.put('/update-images/:resumeId', updateImages);

router.put('/update/videos/:resumeId', updateVideos);

router.get('/get-resume/:resumeId', getResumeById);



module.exports = router;
