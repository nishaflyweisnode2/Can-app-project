const express = require('express');
const router = express.Router();
const { createProfile, updateProfile, getProfileById } = require('../controller/profileController');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


// router.post('/create', createProfile);
router.post('/createProfile', upload.single('image'), createProfile);

router.put('/profiles/:profileId', upload.single('image'), updateProfile);

router.get('/profile/:profileId', getProfileById);



module.exports = router;
