const mongoose = require('mongoose');

const projectStatus = {
    created: 0,
    planning: 1,
    waitingApproval: 2,
    waitingStart: 3,
    ongoing: 4,
    canceled: 80,
    finished: 90
}

const projectSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: true
    },
    description: {
        type: String,
        default: null
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        default: null
    },
    status: {
        type: Number,
        enum: Object.keys(projectStatus).map((key) => {
            return projectStatus[key];
        }),
        default: projectStatus.created
    },
    start: {
        type: Date,
        default: null
    },
    creation: {
        type: Date,
        default: Date.now()
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Project', projectSchema)