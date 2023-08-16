require('dotenv').config()
const userDb = require('../model/userModel');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const qr = require('qrcode');


const { updateUserValidation } = require('../validation/userValidation');


const { nameRegex, passwordRegex, emailRegex, mobileRegex, objectId, isValidBody, isValid, isValidField } = require('../validation/commonValidation')



// twilio start
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);
// teilio end

// nodemailer start
const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});



// image upload function start 
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});
// upload image Start
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "images/image",
        allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"],
    },
});
const upload = multer({ storage: storage }).array('profileImage', 2);

// upload image End




// const signup = async (req, res) => {
//     const { mobileNumber } = req.body;

//     try {
//         if (!isValidBody(req.body)) {
//             return res.status(400).json({ status: 400, message: "Body can't be empty, please enter some data" });
//         }

//         if (!mobileNumber) {
//             return res.status(400).json({ status: 400, message: "Mobile number is required" });
//         }

//         if (!isValid(mobileNumber)) {
//             return res.status(400).json({ status: 400, message: "Mobile number is not valid" });
//         }
//         if (!mobileRegex.test(mobileNumber)) {
//             return res.status(406).json({ status: 406, message: "Mobile number is not valid" });
//         }

//         const existingMobile = await userDb.findOne({ mobileNumber })
//         if (existingMobile) {
//             return res.status(400).json({ status: 400, message: "Mobile number already exists" });
//         }

//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         const user = new userDb({
//             mobileNumber,
//             otp,
//             profileImage: '.',
//         });

//         await user.save();

//         // Send OTP via SMS using Twilio
//         twilioClient.messages
//             .create({
//                 body: `Your OTP for signup is: ${otp}`,
//                 from: '+15739833421',
//                 to: "+91" + mobileNumber,
//             })
//             .then((message) => {
//                 console.log(`SMS sent with SID: ${message.sid}`);
//                 res.status(201).json({ status: 201, message: "Signup successful", user });
//             })
//             .catch((error) => {
//                 console.error('Error sending SMS:', error);
//                 res.status(500).json({ error: 'Failed to send OTP via SMS' });
//             });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to create user' });
//     }
// };


const signup = async (req, res) => {
    const { mobileNumber } = req.body;

    try {
        if (!isValidBody(req.body)) {
            return res.status(400).json({ status: 400, message: "Body can't be empty, please enter some data" });
        }

        if (!mobileNumber) {
            return res.status(400).json({ status: 400, message: "Mobile number is required" });
        }

        if (!isValid(mobileNumber)) {
            return res.status(400).json({ status: 400, message: "Mobile number is not valid" });
        }
        if (!mobileRegex.test(mobileNumber)) {
            return res.status(406).json({ status: 406, message: "Mobile number is not valid" });
        }

        const existingMobile = await userDb.findOne({ mobileNumber })
        if (existingMobile) {
            return res.status(400).json({ status: 400, message: "Mobile number already exists" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new userDb({
            mobileNumber,
            otp,
            profileImage: '.',
        });

        await user.save();

        res.status(201).json({ status: 201, message: "Signup successful", user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};




const verifyOTP = async (req, res) => {
    const { mobileNumber, otp } = req.body;

    try {
        if (!isValid(mobileNumber)) {
            return res.status(406).json({ status: 406, message: "Mobile Number is required" });
        }
        if (!mobileRegex.test(mobileNumber)) {
            return res.status(406).json({ status: 406, message: "Mobile Number is not valid" });
        }
        const user = await userDb.findOne({ mobileNumber })
        if (!user) {
            return res.status(400).json({ status: 400, message: "Mobile Number not found" });
        }
        if (user.otp !== otp) {
            return res.status(401).json({ status: 401, message: "Invalid OTP" });
        }
        user.isVerified = true;
        await user.save();

        res.status(200).json({ status: 200, message: "OTP verified successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to verify OTP' });
    }
};


// const resendOTP = async (req, res) => {
//     const { mobileNumber } = req.body;

//     try {
//         if (!isValid(mobileNumber)) {
//             return res.status(406).json({ status: 406, message: "Mobile Number is required" });
//         }
//         if (!mobileRegex.test(mobileNumber)) {
//             return res.status(406).json({ status: 406, message: "Mobile Number is not valid" });
//         }
//         const user = await userDb.findOne({ mobileNumber })
//         if (!user) {
//             return res.status(400).json({ status: 400, message: "Mobile Number not found" });
//         }
//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         user.otp = otp;
//         await user.save();
//         sendOtpViaSMS(user.mobileNumber, otp, res);

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to resend OTP' });
//     }
// };


// const sendOtpViaSMS = (mobileNumber, otp, res) => {
//     twilioClient.messages
//         .create({
//             body: `Your new OTP for signup is: ${otp}`,
//             from: '+15739833421',
//             to: "+91" + mobileNumber,
//         })
//         .then((message) => {
//             console.log(`SMS sent with SID: ${message.sid}`);
//             res.status(200).json({ status: 200, message: "OTP resent successfully" });
//         })
//         .catch((error) => {
//             console.error('Error sending SMS:', error);
//             res.status(500).json({ error: 'Failed to resend OTP via SMS' });
//         });
// };


const resendOTP = async (req, res) => {
    const { mobileNumber } = req.body;

    try {
        if (!isValid(mobileNumber)) {
            return res.status(406).json({ status: 406, message: "Mobile Number is required" });
        }
        if (!mobileRegex.test(mobileNumber)) {
            return res.status(406).json({ status: 406, message: "Mobile Number is not valid" });
        }
        const user = await userDb.findOne({ mobileNumber })
        if (!user) {
            return res.status(400).json({ status: 400, message: "Mobile Number not found" });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        await user.save();

        res.status(200).json({ status: 200, message: "OTP resent successfully", otp });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to resend OTP' });
    }
};


const login = async (req, res) => {
    try {
        const data = req.body;
        const { /*mobileNumber,*/ otp } = data;
        if (!isValidBody(data)) return res.status(400).json({ status: 400, message: "Body can't be empty, please enter some data" });
        // if (!isValid(mobileNumber)) {
        //     return res.status(406).json({ status: 406, message: "Mobile Number is required" });
        // }
        // if (!mobileRegex.test(mobileNumber)) {
        //     return res.status(406).json({ status: 406, message: "Mobile Number is not valid" });
        // }
        if (!isValid(otp)) return res.status(400).json({ status: 400, message: "Otp is required" });

        const user = await userDb.findOne({ otp });
        if (!user) {
            return res.status(401).json({ status: 401, message: "Invalid Otp" });
        }
        // if (user.otp !== otp) {
        //     return res.status(401).json({ status: 401, message: "Invalid OTP" });
        // }
        user.isVerified = true;

        const payload = {
            userId: user._id,
            userType: user.userType,
        };
        const token = jwt.sign(payload, process.env.USER_SECRET_KEY);

        await user.save();

        return res.status(200).json({
            status: 200,
            message: "Login successful",
            data: { token, user },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};


const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, nowDoing } = req.body;

        const { error } = updateUserValidation.validate({ userId, name, nowDoing });
        if (error) {
            return res.status(400).json({ status: 400, message: error.details[0].message });
        }

        const user = await userDb.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        user.name = name;
        user.nowDoing = nowDoing;

        await user.save();

        res.status(200).json({ status: 200, message: "User updated successfully", user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update user' });
    }
};


const updateProfileImage = async (req, res) => {
    try {
        await upload(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ error: 'Error uploading Profile image', err });
            } else if (err) {
                return res.status(500).json({ error: 'An unknown error occurred', err });
            }

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ status: 400, message: 'No Profile image uploaded' });
            }

            const imageUrl = req.files[0].path;
            const userId = req.params.userId;

            const user = await userDb.findByIdAndUpdate(
                userId,
                { $push: { profileImage: { $each: [imageUrl], $position: 0 } } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ status: 404, message: 'User not found' });
            }

            const updatedProfileImages = user.profileImage || [];
            if (updatedProfileImages.length > 2) {
                return res.status(400).json({ status: 400, message: 'Maximum limit of 2 Profile images reached' });
            }

            return res.status(200).json({
                status: 200,
                message: 'Profile image updated successfully',
                user
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to update Profile image' });
    }
};




module.exports = {
    signup,
    verifyOTP,
    resendOTP,
    login,
    updateUser,
    updateProfileImage,


}