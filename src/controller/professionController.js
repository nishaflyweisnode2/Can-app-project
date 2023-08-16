const ProfessionDb = require('../model/professionModel');


const { createProfessionValidation } = require('../validation/professionValidation');


const createProfession = async (req, res) => {
    try {
        const { name } = req.body;
        const { error } = createProfessionValidation.validate({ name });
        if (error) {
            return res.status(400).json({ status: 400, message: error.details[0].message });
        }
        const newProfession = new ProfessionDb({
            name,
        });

        const savedProfession = await newProfession.save();

        return res.status(201).json({
            status: 201,
            message: 'Profession created successfully',
            data: savedProfession,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create profession' });
    }
};



module.exports = { createProfession };
