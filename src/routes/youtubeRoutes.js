const express = require('express');
const router = express.Router();
const { addYoutubeUrl, updateYoutubeUrl } = require('../controller/youtubeController');



router.post('/add', addYoutubeUrl);

router.put('/youtube/:youtubeId', updateYoutubeUrl);


module.exports = router;
