const express = require('express');
const router = express.Router();
const { createAppointment, updateAppointment } = require('../controller/appointmentController');


router.post('/create', createAppointment);


router.put('/update/:appointmentId', updateAppointment);


module.exports = router;
