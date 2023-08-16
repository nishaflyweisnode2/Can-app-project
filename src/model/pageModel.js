const mongoose = require('mongoose');


const pageSchema = new mongoose.Schema({

    introduction: String,
    status: String,
    resume: String,
    vision: String,
    aim: String,
    experience: String,
    skills: String,
    achievements: String,
    timeline: String,
    brochure: String,
    menu: String,
    donate: String,
    appointment: String,
    instagram: String,
    youtube: String,
    website: String,
    call: String,
    contactMe: String,
    buyNow: String,
    payNow: String,
    gallery: String,
    portfolio: String,
    pitchDeck: String,

});


const Page = mongoose.model('Page', pageSchema);



module.exports = Page;
