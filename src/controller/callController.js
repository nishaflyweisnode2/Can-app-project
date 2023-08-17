const CallDb = require('../model/callModel');

const { makeCallValidation, editCallValidation } = require('../validation/callValidation');



const makeCall = async (req, res) => {
    try {
        const { mobileNumber, setCallTimings } = req.body;

        const { error } = makeCallValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, message: error.details[0].message });
        }

        const call = new CallDb({
            mobileNumber,
            setCallTimings,
        });

        await call.save();

        return res.status(201).json({
            status: 201,
            message: 'Call made successfully',
            call,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to make a call' });
    }
};



const editCall = async (req, res) => {
    try {
        const { callId } = req.params;
        const { mobileNumber, setCallTimings } = req.body;

        const { error } = editCallValidation.validate({ callId, mobileNumber, setCallTimings });
        if (error) {
            return res.status(400).json({ status: 400, message: error.details[0].message });
        }

        const updatedCall = await CallDb.findByIdAndUpdate(
            callId,
            {
                mobileNumber,
                setCallTimings,
            },
            { new: true }
        );

        if (!updatedCall) {
            return res.status(404).json({ status: 404, message: 'Call not found' });
        }

        return res.status(200).json({
            status: 200,
            message: 'Call updated successfully',
            call: updatedCall,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to update the call' });
    }
};



module.exports = {
    makeCall,
    editCall
};
