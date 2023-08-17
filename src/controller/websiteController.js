const Website = require('../model/websiteModel');

const { websiteValidation, websiteUpdateValidation, websiteGetByIdValidation } = require('../validation/websitevalidation');



const createWebsite = async (req, res) => {
    try {
        const { url } = req.body;

        const { error } = websiteValidation.validate({ url });
        if (error) {
            return res.status(400).json({ status: 400, message: error.details[0].message });
        }

        const website = new Website({
            url,
        });

        await website.save();

        res.status(201).json({
            status: 'success',
            message: 'Website created successfully',
            website,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to create website',
        });
    }
};



const updateWebsite = async (req, res) => {
    try {
        const { websiteId } = req.params;
        const { url } = req.body;

        const { error } = websiteUpdateValidation.validate({ websiteId, url });
        if (error) {
            return res.status(400).json({ status: 400, message: error.details[0].message });
        }

        const updatedWebsite = await Website.findByIdAndUpdate(
            websiteId,
            { url },
            { new: true }
        );

        if (!updatedWebsite) {
            return res.status(404).json({ status: 404, message: 'Website not found' });
        }

        return res.status(200).json({
            status: 200,
            message: 'Website URL updated successfully',
            website: updatedWebsite,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to update website URL' });
    }
};



const getWebsitesById = async (req, res) => {
    try {
        const { websiteId } = req.params;

        const { error } = websiteGetByIdValidation.validate({ websiteId });
        if (error) {
            return res.status(400).json({ status: 400, message: error.details[0].message });
        }

        const website = await Website.findById(websiteId);

        if (!website) {
            return res.status(404).json({ status: 404, message: "Website not found" });
        }

        res.status(200).json({
            status: 'success',
            website,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch website',
        });
    }
};




module.exports = {
    createWebsite,
    updateWebsite,
    getWebsitesById,
};
