const { string } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    mobileNumber: {
        type: String,
        // required: true,
        unique: true,
    },
    otp: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    userType: {
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    },
    name: {
        type: String,
        // required: true,
    },
    nowDoing: {
        type: String,
        // required: true,
    },
    profileImage: [{ type: String }],


}, { timestamps: true })

const user = mongoose.model('User', userSchema);


module.exports = user;
