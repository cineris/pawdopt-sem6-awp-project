const mongoose = require('mongoose');

const petsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        default: 'NA'
    },
    desc: {
        type: String,
        default: 'NA'
    },
    gender: {
        type: String,
        default: 'to be confirmed'
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
    },
    photo: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('Pets', petsSchema);
