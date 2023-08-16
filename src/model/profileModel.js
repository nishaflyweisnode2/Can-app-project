const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    },
    profession: {
        type: String,
    },
    location: {
        state: {
            type: String,
            default: "India"
        },
        district: {
            type: String,
        },
        place: {
            type: String,
        },
    },
    taps: {
        tap1: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tap1' }],
        tap2: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tap2' }],
    },
    managePages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ManagePage' }],
    permission: {
        type: Boolean,
        
    },


}, { timestamps: true });



const Profile = mongoose.model('Profile', profileSchema);



module.exports = Profile;
