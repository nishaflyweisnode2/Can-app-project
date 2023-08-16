const ProfileDb = require('../model/profileModel');



const createProfile = async (req, res) => {
    try {
        const {
            image,
            name,
            text,
            profession,
            location,
            taps,
            managePages,
            permission,
        } = req.body;

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

        const savedProfile = await newProfile.save();

        return res.status(201).json({
            status: 201,
            message: 'Profile created successfully',
            data: savedProfile,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create profile' });
    }
};




module.exports = { createProfile };
