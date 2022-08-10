const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
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

module.exports = mongoose.model('Company', companySchema)