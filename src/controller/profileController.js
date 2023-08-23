const ProfileDb = require('../model/profileModel');
const Profession = require('../model/professionModel');
const Page = require('../model/pageModel');
const ResumeDb = require('../model/resumeModel');
const IntroductionDb = require('../model/introductionModel');

const { profileValidation, updateProfileValidation, profileIdValidation } = require('../validation/profileValidation');




const createProfile = async (req, res) => {
    try {
        const {
            name,
            text,
            profession,
            location,
            taps,
            managePages,
            permission,
        } = req.body;

        const { error } = profileValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, message: error.details[0].message });
        }

        let image;

        if (req.file) {
            image = req.file ? req.file.path : "";
        }

        const professionExists = await Profession.findById(profession);
        if (!professionExists) {
            return res.status(404).json({ status: 404, message: 'Profession not found' });
        }
        const tapsExist = await Promise.all(taps.tap1.concat(taps.tap2).map(async (tapId) => {
            const tap = await Page.findById(tapId);
            return tap !== null;
        }));
        if (tapsExist.includes(false)) {
            return res.status(404).json({ status: 404, message: 'One or more taps not found' });
        }
        const managePagesExist = await Promise.all(managePages.map(async (pageId) => {
            const page = await Page.findById(pageId);
            return page !== null;
        }));
        if (managePagesExist.includes(false)) {
            return res.status(404).json({ status: 404, message: 'One or more manage pages not found' });
        }

        const newProfile = new ProfileDb({
            image,
            name,
            text,
            profession,
            location,
            taps,
            managePages,
            permission,
        });

        await newProfile.save();

        const populatedPost = await ProfileDb.findById(newProfile._id)
            .populate('profession')
            .populate('taps.tap1')
            .populate('taps.tap2')
            .populate('managePages')


        return res.status(201).json({
            status: 201,
            message: 'Profile created successfully',
            data: populatedPost,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create profile' });
    }
};



const updateProfile = async (req, res) => {
    try {
        const profileId = req.params.profileId;
        const {
            name,
            text,
            profession,
            location,
            taps,
            managePages,
            permission,
        } = req.body;

        const { error } = updateProfileValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, message: error.details[0].message });
        }

        let updatedProfileData = {
            name,
            text,
            profession,
            location,
            taps,
            managePages,
            permission,
        };
        console.log("Updated Profile Data:", updatedProfileData);

        if (req.file) {
            updatedProfileData.image = req.file ? req.file.path : "";
        }

        const professionExists = await Profession.findById(profession);
        if (profession) {
            if (!professionExists) {
                return res.status(404).json({ status: 404, message: 'Profession not found' });
            }
        }
        if (taps) {
            const tapsExist = await Promise.all(taps.tap1.concat(taps.tap2).map(async (tapId) => {
                const tap = await Page.findById(tapId);
                return tap !== null;
            }));
            if (tapsExist.includes(false)) {
                return res.status(404).json({ status: 404, message: 'One or more taps not found' });
            }
        }
        if (managePages) {
            const managePagesExist = await Promise.all(managePages.map(async (pageId) => {
                const page = await Page.findById(pageId);
                return page !== null;
            }));
            if (managePagesExist.includes(false)) {
                return res.status(404).json({ status: 404, message: 'One or more manage pages not found' });
            }
        }

        const updatedProfile = await ProfileDb.findOneAndUpdate(
            { _id: profileId },
            updatedProfileData,
            { new: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ status: 404, message: 'Profile not found' });
        }

        const populatedProfile = await ProfileDb.findById(updatedProfile._id)
            .populate('profession')
            .populate('taps.tap1')
            .populate('taps.tap2')
            .populate('managePages');

        return res.status(200).json({
            status: 200,
            message: 'Profile updated successfully',
            data: populatedProfile,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to update profile' });
    }
};



const getProfileById = async (req, res) => {
    try {
        const profileId = req.params.profileId;

        const { error } = profileIdValidation.validate({ profileId });
        if (error) {
            return res.status(400).json({ status: 400, message: error.details[0].message });
        }
        const profile = await ProfileDb.findById(profileId)
            .populate('profession')
            .select('name image location profession managePages')

        if (!profile) {
            return res.status(404).json({ status: 404, message: 'Profile not found' });
        }
        const managePagesEntry = profile.managePages[0];
        const { resume, introduction } = await Page.findById(managePagesEntry);
        const checkResume = await ResumeDb.findById(resume);
        const checkIntroduction = await IntroductionDb.findById(introduction);


        const responseData = {
            _id: profile._id,
            image: profile.image,
            name: profile.name,
            location: profile.location,
            profession: profile.profession,
            managePages: {
                _id: managePagesEntry._id,
                resume: checkResume,
                introduction: checkIntroduction
            }
        };

        return res.status(200).json({
            status: 200,
            message: 'Profile retrieved successfully',
            data: responseData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve profile' });
    }
};





module.exports = { createProfile, updateProfile, getProfileById };
