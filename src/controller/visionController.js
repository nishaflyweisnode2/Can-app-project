const Vision = require('../model/visionModel');

const visionValidation = require('../validation/visionValidation');


const createVision = async (req, res) => {
    try {
        const { description } = req.body;

        const { error } = visionValidation.validate({
            description,
        });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const experience = new Vision({
            description,
        });

        await experience.save();

        return res.status(201).json({
            message: 'Experience created successfully',
            experience,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create experience' });
    }
};


const updatVision= async (req, res) => {
    try {
        const { description } = req.body;
        const experienceId = req.params.experienceId;

        const { error } = visionValidation.validate({
            description,
        });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const updatedExperience = await Vision.findByIdAndUpdate(
            experienceId,
            { description },
            { new: true }
        );

        if (!updatedExperience) {
            return res.status(404).json({ status: 404, message: 'Experience not found' });
        }

        return res.status(200).json({
            message: 'Experience updated successfully',
            experience: updatedExperience,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to update experience' });
    }
};




module.exports = {
    createVision,
    updatVision

};
