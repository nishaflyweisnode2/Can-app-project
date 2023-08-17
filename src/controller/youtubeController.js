const Youtube = require('../model/youtubeModel');

const { addYoutubeUrlValidation, updateYoutubeUrlValidation } = require('../validation/youtubeValidation');




const addYoutubeUrl = async (req, res) => {
    try {
        const { url } = req.body;

        const { error } = addYoutubeUrlValidation.validate({ url });
        if (error) {
            return res.status(400).json({ status: 400, message: error.details[0].message });
        }

        const existingUrl = await Youtube.findOne({ url });
        if (existingUrl) {
            return res.status(409).json({ status: 409, message: 'YouTube URL already exists' });
        }

        const youtube = new Youtube({ url });
        await youtube.save();

        return res.status(201).json({
            status: 'success',
            message: 'YouTube URL added successfully',
            youtube,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to add YouTube URL',
        });
    }
};



const updateYoutubeUrl = async (req, res) => {
    try {
        const { youtubeId } = req.params;
        const { url } = req.body;

        const { error } = updateYoutubeUrlValidation.validate({ youtubeId, url });
        if (error) {
            return res.status(400).json({ status: 400, message: error.details[0].message });
        }

        const existingUrl = await Youtube.findById(youtubeId);
        if (!existingUrl) {
            return res.status(404).json({ status: 404, message: 'YouTube URL not found' });
        }

        existingUrl.url = url;
        await existingUrl.save();

        return res.status(200).json({
            status: 'success',
            message: 'YouTube URL updated successfully',
            youtube: existingUrl,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to update YouTube URL',
        });
    }
};




module.exports = {
    addYoutubeUrl,
    updateYoutubeUrl
};
