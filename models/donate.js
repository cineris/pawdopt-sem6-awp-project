const mongoose = require('mongoose');

const donateSchema = new mongoose.Schema({
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
    amount: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Donate', donateSchema);
