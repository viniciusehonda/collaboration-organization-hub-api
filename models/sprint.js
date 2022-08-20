const mongoose = require('mongoose');

const sprintSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        unique: true
    },
    description: {
        type: String,
        default: null
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        default: null
    },
    milestone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Milestone',
        default: null
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    creation: {
        type: Date,
        default: Date.now()
    },
    start: {
        type: Date,
        default: null
    },
    deadline: {
        type: Date,
        default: null
    },
    end: {
        type: Date,
        default: null
    },
    labels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Label'
        }
    ]
})

module.exports = mongoose.model('Sprint', sprintSchema)