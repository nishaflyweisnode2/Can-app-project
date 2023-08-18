const Instagram = require('../model/instagramModel');

const { addInstagramLinkValidation, updateInstagramLinkValidation } = require('../validation/instagramValidation');



const addInstagramLink = async (req, res) => {
    try {
        const { url } = req.body;

        const { error } = addInstagramLinkValidation.validate({ url });
        if (error) {
            return res.status(400).json({ status: 400, message: error.details[0].message });
        }

        const existingLink = await Instagram.findOne({ url });
        if (existingLink) {
            return res.status(409).json({ status: 409, message: 'Instagram link already exists' });
        }

        const instagramLink = new Instagram({ url });
        await instagramLink.save();

        return res.status(201).json({
            status: 'success',
            message: 'Instagram link added successfully',
            instagramLink,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to add Instagram link',
        });
    }
};



const updateInstagramLink = async (req, res) => {
    try {
        const { instagramId } = req.params;
        const { url } = req.body;

        const { error } = updateInstagramLinkValidation.validate({ instagramId, url });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const updatedInstagram = await Instagram.findByIdAndUpdate(
            instagramId,
            { url },
            { new: true }
        );

        if (!updatedInstagram) {
            return res.status(404).json({ message: 'Instagram link not found' });
        }

        return res.status(200).json({
            message: 'Instagram link updated successfully',
            updatedInstagram,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to update Instagram link' });
    }
};





module.exports = {
    addInstagramLink,
    updateInstagramLink,

};
