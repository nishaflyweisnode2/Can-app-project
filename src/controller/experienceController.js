const Experience = require('../model/experienceModel');

const experienceValidation = require('../validation/experienceValidation');


const createExperience = async (req, res) => {
    try {
        const { description } = req.body;

        const { error } = experienceValidation.validate({
            description,
        });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const experience = new Experience({
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


const updateExperience = async (req, res) => {
    try {
        const { description } = req.body;
        const experienceId = req.params.experienceId;

        const { error } = experienceValidation.validate({
            description,
        });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const updatedExperience = await Experience.findByIdAndUpdate(
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
    createExperience,
    updateExperience

};
