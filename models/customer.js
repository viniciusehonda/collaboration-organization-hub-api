const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: true
    },
    description: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('Customer', customerSchema)