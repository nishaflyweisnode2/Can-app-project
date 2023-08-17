const mongoose = require('mongoose');


const callSchema = new mongoose.Schema({
    region: {
        type: String,
        default: 'India',
    },
    countryCode: {
        type: String,
        default: '+91',
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    setCallTimings: {
        anyTime: Boolean,
        customizeTimings: {
            setDays: [String],
            setTiming: String,
        },
    },
});


const Call = mongoose.model('Call', callSchema);


module.exports = Call;
