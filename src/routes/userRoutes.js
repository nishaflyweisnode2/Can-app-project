require('dotenv').config()
const express = require('express');
const router = express.Router();


const { signup, verifyOTP, resendOTP, login, updateUser, updateProfileImage } = require("../controller/userController");




// user
router.post('/signup', signup);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/login', login)
router.put('/update/:userId', updateUser);
router.put('/update/:userId/profileImage', updateProfileImage);






router.all("/*", (req, res) => { res.status(400).send({ status: false, message: "Endpoint is not correct plese provide a proper end-point" }) })




module.exports = router;