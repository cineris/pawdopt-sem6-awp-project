const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
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
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String
    },
    prefDate: {
        type: Date,
        required: true
    },
    prefTime: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Volunteer', volunteerSchema);
