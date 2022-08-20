const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
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
    sprint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sprint',
        default: null
    },
    milestone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Milestone',
        default: null
    },
    parentTask: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        default: null
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    responsibles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    labels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Label'
        }
    ]
})

module.exports = mongoose.model('Task', taskSchema)