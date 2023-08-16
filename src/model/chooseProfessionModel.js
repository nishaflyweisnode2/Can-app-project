const mongoose = require('mongoose');

const ChooseProfessionSchema = new mongoose.Schema({
    profession: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profession',
    },
    name: {
        type: String,
        required: true,
    },

});

const chooseProfession = mongoose.model('ChooseProfession', ChooseProfessionSchema);

module.exports = chooseProfession;
