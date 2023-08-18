const express = require('express');
const router = express.Router();

const { createGallery, getAllGallery, updateGallery } = require('../controller/galleryController');


router.post('/create', createGallery);

router.get('/gallery/:galleryId?', getAllGallery);

router.put('/:galleryId', updateGallery);


module.exports = router;
