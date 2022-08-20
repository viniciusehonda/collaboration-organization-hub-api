const mongoose = require('mongoose');

const timeRecordSchema = new mongoose.Schema({
    notes: {
        type: String,
        default: null
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    start: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date,
        default: null
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})

module.exports = mongoose.model('TimeRecord', timeRecordSchema)