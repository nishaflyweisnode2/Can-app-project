const express = require('express');
const router = express.Router();

const { addInstagramLink, updateInstagramLink } = require('../controller/instagramController');



router.post('/add', addInstagramLink);

router.put('/update/:instagramId', updateInstagramLink);


module.exports = router;
