const Brochure = require('../model/brochureModel');

const { addBrochureValidation } = require('../validation/brochureValidation');



// start
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

const storage1 = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'notes/notes',
        allowed_formats: ['pdf', 'PDF', 'doc', 'docx'],
    },
});

const upload1 = multer({ storage: storage1 }).single('fileUrl');
//End




const addBrochure = async (req, res) => {
    try {
        const { create } = req.body;

        const { error } = addBrochureValidation.validate({ create });
        if (error) {
            return res.status(400).json({ status: 400, message: error.details[0].message });
        }

        const brochure = new Brochure({
            create,
        });

        await brochure.save();

        return res.status(201).json({
            status: 'success',
            message: 'Brochure added successfully',
            brochure,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to add brochure',
        });
    }
};



const uploadBrochurePdf = async (req, res) => {
    try {
        await upload1(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ status: 500, message: 'Error uploading files' });
            } else if (err) {
                return res.status(500).json({ status: 500, message: 'An unknown error occurred' });
            }

            const { filename } = req.body;

            const brochure = new Brochure({
                filename,
                fileUrl: req.file.path,
            });

            await brochure.save();

            return res.status(201).json({
                status: 201,
                message: 'Brochure added successfully',
                brochure,
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'Failed to add brochure' });
    }
};







module.exports = {
    addBrochure,
    uploadBrochurePdf
};
