const Appointment = require('../model/appointmentModel');

const { createAppointmentValidation, updateAppointmentValidation } = require('../validation/appointmentValidation');



const createAppointment = async (req, res) => {
    try {
        const { name, mobileNumber, emailId, message } = req.body;

        const { error } = createAppointmentValidation.validate({
            name,
            mobileNumber,
            emailId,
            message,
        });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const appointment = new Appointment({
            name,
            mobileNumber,
            emailId,
            message,
        });

        await appointment.save();

        return res.status(201).json({
            message: 'Appointment created successfully',
            appointment,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create appointment' });
    }
};



const updateAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { name, mobileNumber, emailId, message } = req.body;

        const { error } = updateAppointmentValidation.validate({
            appointmentId,
            name,
            mobileNumber,
            emailId,
            message,
        });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { name, mobileNumber, emailId, message },
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        return res.status(200).json({
            message: 'Appointment updated successfully',
            updatedAppointment,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to update appointment' });
    }
};



module.exports = {
    createAppointment,
    updateAppointment,
};
