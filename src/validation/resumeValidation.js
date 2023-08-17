const Joi = require('joi');
const mongoose = require('mongoose');



module.exports.createResumeValidation = Joi.object({
    image: Joi.string().required(),
    name: Joi.string().required(),
    summary: Joi.object({
        text: Joi.string(),
        image: Joi.string(),
        video: Joi.string(),
    }),
    workingstatus: Joi.object({
        nowWorking: Joi.object({
            role: Joi.string(),
            organisation: Joi.string(),
            workDetails: Joi.string(),
            package: Joi.string(),
        }),
        lookingFor: Joi.object({
            roleLookingfor: Joi.string(),
            exceptedPackage: Joi.string(),
        }),
    }),
    experience: Joi.array().items(
        Joi.object({
            experience: Joi.object({
                heading: Joi.string(),
                date: Joi.string(),
                description: Joi.string(),
                image: Joi.string(),
                video: Joi.string(),
            }),
            experties: Joi.object({
                heading: Joi.string(),
                date: Joi.string(),
                description: Joi.string(),
                image: Joi.string(),
                video: Joi.string(),
            }),
        })
    ),
    education: Joi.array().items(
        Joi.object({
            heading: Joi.string(),
            description: Joi.string(),
            image: Joi.string(),
            video: Joi.string(),
        })
    ),
    certifications: Joi.array().items(
        Joi.object({
            heading: Joi.string(),
            description: Joi.string(),
            image: Joi.string(),
            video: Joi.string(),
        })
    ),
    skills: Joi.array().items(
        Joi.object({
            softSkills: Joi.object({
                heading: Joi.string(),
                description: Joi.string(),
                image: Joi.string(),
                video: Joi.string(),
            }),
            itSkills: Joi.object({
                heading: Joi.string(),
                description: Joi.string(),
                image: Joi.string(),
                video: Joi.string(),
            }),
            technicalSkills: Joi.object({
                heading: Joi.string(),
                description: Joi.string(),
                image: Joi.string(),
                video: Joi.string(),
            }),
            managementSkills: Joi.object({
                heading: Joi.string(),
                description: Joi.string(),
                image: Joi.string(),
                video: Joi.string(),
            }),
            generalSkills: Joi.object({
                heading: Joi.string(),
                description: Joi.string(),
                image: Joi.string(),
                video: Joi.string(),
            }),
        })
    ),
    achievements: Joi.array().items(
        Joi.object({
            heading: Joi.string(),
            description: Joi.string(),
            image: Joi.string(),
            video: Joi.string(),
        })
    ),
    personalDetails: Joi.object({
        familyBackground: Joi.string(),
        motherName: Joi.string(),
        dateOfBirth: Joi.string(),
        languageKnown: Joi.string(),
        maritalStatus: Joi.string(),
        currentLocation: Joi.string(),
    }),
    declartion: Joi.string(),
});



module.exports.updateResumeValidation = Joi.object({
    image: Joi.string(),
    name: Joi.string(),
    summary: Joi.object({
        text: Joi.string(),
        image: Joi.string(),
        video: Joi.string(),
    }),
    workingstatus: Joi.object({
        nowWorking: Joi.object({
            role: Joi.string(),
            organisation: Joi.string(),
            workDetails: Joi.string(),
            package: Joi.string(),
        }),
        lookingFor: Joi.object({
            roleLookingfor: Joi.string(),
            exceptedPackage: Joi.string(),
        }),
    }),
    experience: Joi.array().items(
        Joi.object({
            experience: Joi.object({
                heading: Joi.string(),
                date: Joi.string(),
                description: Joi.string(),
                image: Joi.string(),
                video: Joi.string(),
            }),
            experties: Joi.object({
                heading: Joi.string(),
                date: Joi.string(),
                description: Joi.string(),
                image: Joi.string(),
                video: Joi.string(),
            }),
        })
    ),
    education: Joi.array().items(
        Joi.object({
            heading: Joi.string(),
            description: Joi.string(),
            image: Joi.string(),
            video: Joi.string(),
        })
    ),
    certifications: Joi.array().items(
        Joi.object({
            heading: Joi.string(),
            description: Joi.string(),
            image: Joi.string(),
            video: Joi.string(),
        })
    ),
    skills: Joi.array().items(
        Joi.object({
            softSkills: Joi.object({
                heading: Joi.string(),
                description: Joi.string(),
                image: Joi.string(),
                video: Joi.string(),
            }),
            itSkills: Joi.object({
                heading: Joi.string(),
                description: Joi.string(),
                image: Joi.string(),
                video: Joi.string(),
            }),
            technicalSkills: Joi.object({
                heading: Joi.string(),
                description: Joi.string(),
                image: Joi.string(),
                video: Joi.string(),
            }),
            managementSkills: Joi.object({
                heading: Joi.string(),
                description: Joi.string(),
                image: Joi.string(),
                video: Joi.string(),
            }),
            generalSkills: Joi.object({
                heading: Joi.string(),
                description: Joi.string(),
                image: Joi.string(),
                video: Joi.string(),
            }),
        })
    ),
    achievements: Joi.array().items(
        Joi.object({
            heading: Joi.string(),
            description: Joi.string(),
            image: Joi.string(),
            video: Joi.string(),
        })
    ),
    personalDetails: Joi.object({
        familyBackground: Joi.string(),
        motherName: Joi.string(),
        dateOfBirth: Joi.string(),
        languageKnown: Joi.string(),
        maritalStatus: Joi.string(),
        currentLocation: Joi.string(),
    }),
    declartion: Joi.string(),
});


module.exports.getResumeByIdValidation = Joi.object({
    resumeId: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.isValidObjectId(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        })
        .required(),
})
