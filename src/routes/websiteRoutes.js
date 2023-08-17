const express = require('express');
const router = express.Router();

const { createWebsite, updateWebsite, getWebsitesById } = require('../controller/websiteController');


router.post('/create', createWebsite);

router.put('/update/:websiteId', updateWebsite);

router.get('/get/:websiteId', getWebsitesById);


module.exports = router;
