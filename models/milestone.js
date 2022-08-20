const mongoose = require('mongoose');

const milestoneStatus = {
    created: 0,
    waiting: 1,
    ongoing: 2,
    paused : 3,
    finished: 80,
    deployed: 90,
}

const milestoneSchema = new mongoose.Schema({
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
    status: {
        type: Number,
        enum: Object.keys(milestoneStatus).map((key) => {
            return milestoneStatus[key];
        }),
        default: milestoneStatus.created
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

module.exports = mongoose.model('Milestone', milestoneSchema)