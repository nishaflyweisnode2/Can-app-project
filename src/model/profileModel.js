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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profession',
        required: true,
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
        tap1: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }],
        tap2: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }],
    },
    managePages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }],
    permission: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
