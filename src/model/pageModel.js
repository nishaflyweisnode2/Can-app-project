const mongoose = require('mongoose');


const pageSchema = new mongoose.Schema({

    introduction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Introduction',
        required: true,
    },
    status: String,
    resume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
        required: true,
    },
    vision: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vision',
        required: true,
    },
    aim: String,
    experience: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experience',
        required: true,
    },
    skills: String,
    achievements: String,
    timeline: String,
    brochure: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brochure',
        required: true,
    },
    menu: String,
    donate: String,
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true,
    },
    instagram: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instagram',
        required: true,
    },
    youtube: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Youtube',
        required: true,
    },
    website: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Website',
        required: true,
    },
    call: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Call',
        required: true,
    },
    contactMe: String,
    buyNow: String,
    payNow: String,
    gallery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gallery',
        required: true,
    },
    portfolio: String,
    pitchDeck: String,

});


const Page = mongoose.model('Page', pageSchema);



module.exports = Page;
