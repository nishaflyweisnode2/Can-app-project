const Gallery = require('../model/galleryModel');

const { galleryImageValidation, galleryVideoValidation } = require('../validation/galleryValidation');




const createGallery = async (req, res) => {
    try {
        const { uploadImage, uploadVideo } = req.body;

        if (!uploadImage && !uploadVideo) {
            return res.status(400).json({ message: 'At least one of "uploadImage" or "uploadVideo" is required' });
        }

        if (uploadImage) {
            const { error: imageError } = galleryImageValidation.validate({ url: uploadImage });
            if (imageError) {
                return res.status(400).json({ message: imageError.details[0].message });
            }
        }

        if (uploadVideo) {
            const { error: videoError } = galleryVideoValidation.validate({ url: uploadVideo });
            if (videoError) {
                return res.status(400).json({ message: videoError.details[0].message });
            }
        }

        const gallery = new Gallery({
            uploadImage: uploadImage || [],
            uploadVideo: uploadVideo || []
        });

        await gallery.save();

        return res.status(201).json({
            message: 'Gallery created successfully',
            gallery
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create gallery' });
    }
};


const getAllGallery = async (req, res) => {
    try {
        const { galleryId } = req.params;

        if (galleryId) {
            const gallery = await Gallery.findById(galleryId);
            if (!gallery) {
                return res.status(404).json({ status: 404, message: 'Gallery not found' });
            }
            return res.status(200).json({
                message: 'Gallery retrieved successfully',
                gallery
            });
        }

        const galleries = await Gallery.find();
        if (!galleries) {
            return res.status(404).json({ status: 404, message: 'Galleries not found' });
        }

        return res.status(200).json({
            message: 'Galleries retrieved successfully',
            galleries
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to retrieve galleries' });
    }
};


const updateGallery = async (req, res) => {
    try {
        const { galleryId } = req.params;
        const { uploadImage, uploadVideo } = req.body;

        const gallery = await Gallery.findById(galleryId);

        if (!gallery) {
            return res.status(404).json({ message: 'Gallery not found' });
        }

        if (uploadImage) {
            const { error: imageError } = galleryImageValidation.validate({ url: uploadImage });
            if (imageError) {
                return res.status(400).json({ message: imageError.details[0].message });
            }

            if (uploadImage.length > 0) {
                gallery.uploadImage.push(...uploadImage);
            }
        }

        if (uploadVideo) {
            const { error: videoError } = galleryVideoValidation.validate({ url: uploadVideo });
            if (videoError) {
                return res.status(400).json({ message: videoError.details[0].message });
            }

            if (uploadVideo.length > 0) {
                gallery.uploadVideo.push(...uploadVideo);
            }
        }

        await gallery.save();

        return res.status(200).json({
            message: 'Gallery updated successfully',
            gallery
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to update gallery' });
    }
};





module.exports = {
    createGallery,
    getAllGallery,
    updateGallery,

};
