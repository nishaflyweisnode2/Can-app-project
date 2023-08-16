const pageDb = require('../model/pageModel');


const { createPageValidation } = require('../validation/pageValidation');



const createPage = async (req, res) => {
    try {
        const { intro, status, resume, vision, aim, experience, skills, achievements, timeline, brochure, menu, donate, appointment, instagram, youtube, website, call, contactMe, buyNow, payNow, gallery, portfolio, pitchDeck } = req.body;

        const { error } = createPageValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, message: error.details[0].message });
        }
        const newPage = new pageDb({
            introduction,
            status,
            resume,
            vision,
            aim,
            experience,
            skills,
            achievements,
            timeline,
            brochure,
            menu,
            donate,
            appointment,
            instagram,
            youtube,
            website,
            call,
            contactMe,
            buyNow,
            payNow,
            gallery,
            portfolio,
            pitchDeck,
        });

        const savedPage = await newPage.save();

        return res.status(201).json({
            status: 201,
            message: 'Page created successfully',
            data: savedPage,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create page' });
    }
};




module.exports = { createPage };
