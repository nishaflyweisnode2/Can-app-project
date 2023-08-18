const Introduction = require('../model/introductionModel');

const { createIntroductionValidation } = require('../validation/introductionValidation');



const createIntroduction = async (req, res) => {
    try {
        const { introduction } = req.body;

        const { error } = createIntroductionValidation.validate({ introduction });
        if (error) {
            return res.status(400).json({ status: 400, message: error.details[0].message });
        }

        const newIntroduction = new Introduction({ introduction });
        await newIntroduction.save();

        return res.status(201).json({
            status: 'success',
            message: 'Introduction created successfully',
            introduction: newIntroduction,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'Failed to create introduction' });
    }
};



const updateIntroduction = async (req, res) => {
    try {
        const { introductionId } = req.params;
        const { introduction } = req.body;

        const updatedIntroduction = await Introduction.findByIdAndUpdate(
            introductionId,
            { $set: { introduction } },
            { new: true }
        );

        if (!updatedIntroduction) {
            return res.status(404).json({ status: 404, message: 'Introduction not found' });
        }

        return res.status(200).json({
            status: 200,
            message: 'Introduction updated successfully',
            introduction: updatedIntroduction,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'Failed to update introduction' });
    }
};



module.exports = {
    createIntroduction,
    updateIntroduction,

};
