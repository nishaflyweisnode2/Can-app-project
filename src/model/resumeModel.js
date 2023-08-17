const { string } = require('joi');
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    summary: {
        text: String,
        image: String,
        video: String
    },
    workingstatus: {
        nowWorking: {
            role: String,
            organisation: String,
            workDetails: String,
            package: String,
        },
        lookingFor: {
            roleLookingfor: String,
            exceptedPackage: String
        }
    },
    experience: [{
        experience: {
            heading: String,
            date: String,
            description: String,
            image: String,
            video: String,
        },
        experties: {
            heading: String,
            date: String,
            description: String,
            image: String,
            video: String,
        },
    }],

    education: [
        {
            heading: String,
            description: String,
            image: String,
            video: String,
        },
    ],
    certifications: [
        {
            heading: String,
            description: String,
            image: String,
            video: String,
        },
    ],

    skills: [{
        softSkills: {
            heading: String,
            description: String,
            image: String,
            video: String,
        },
        itSkills: {
            heading: String,
            description: String,
            image: String,
            video: String,
        },
        technicalSkills: {
            heading: String,
            description: String,
            image: String,
            video: String,
        },
        managementSkills: {
            heading: String,
            description: String,
            image: String,
            video: String,
        },
        generalSkills: {
            heading: String,
            description: String,
            image: String,
            video: String,
        },
    }],
    achievements: [
        {
            heading: String,
            description: String,
            image: String,
            video: String,

        },
    ],
    personalDetails: {
        familyBackground: String,
        motherName: String,
        dateOfBirth: String,
        languageKnown: String,
        maritalStatus: String,
        currentLocation: String,

    },
    declartion: String

});



const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
