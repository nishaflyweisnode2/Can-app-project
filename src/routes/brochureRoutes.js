
const express = require('express');
const router = express.Router();

const { addBrochure, uploadBrochurePdf } = require('../controller/brochureController');


router.post('/brochure', addBrochure);

router.post('/uploadPdf', uploadBrochurePdf);



module.exports = router;
