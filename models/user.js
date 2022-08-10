const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String,
        default: null
    },
    lastName: {
        required: true,
        type: String,
        default: null
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        required: true,
        select: false,
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)