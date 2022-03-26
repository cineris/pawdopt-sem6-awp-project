const mongoose = require('mongoose');

const rescueSchema = new mongoose.Schema({
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
    phoneNo: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Rescue', rescueSchema);
