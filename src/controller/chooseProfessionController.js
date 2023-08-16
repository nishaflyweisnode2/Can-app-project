require('dotenv').config()
const chooseProfessionDb = require('../model/chooseProfessionModel');
const ProfessionDb = require('../model/professionModel');


const { createChooseProfessionValidation } = require('../validation/chooseProfessionValidation');




const createChooseProfession = async (req, res) => {
    try {
        const { profession, name } = req.body;
        const { error } = createChooseProfessionValidation.validate({ profession, name });
        if (error) {
            return res.status(400).json({ status: 400, message: error.details[0].message });
        }
        const checkProfession = await ProfessionDb.findOne({ _id: profession })
        if (!checkProfession) {
            return res.status(404).json({ status: 404, message: "profession Id is not valid" });
        }
        const newProfession = new chooseProfessionDb({
            profession,
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




module.exports = { createChooseProfession };
