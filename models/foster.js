const mongoose = require('mongoose');

const fosterSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mailID: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Foster', fosterSchema);
