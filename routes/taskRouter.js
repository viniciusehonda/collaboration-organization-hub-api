const express = require('express');

const router = express.Router();
const Task = require('../models/task');

router.post('/post', async (req, res) => {
    try {
        const data = new Task({
            title: req.body.title,
            description: req.body.description,
            creator: req.body.creator
        })
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/getAll', async (req, res) => {
    try {
        const data = await Task.find();
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/get/:id', async (req, res) => {
    try {
        const data = await Task.findById(req.params.id);
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        Task.findByIdAndUpdate(
            id,
            updatedData,
            options
        ).then((result) => {
            res.status(200).send(result)
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        Task.findByIdAndDelete(id)
            .then((result) => {
                res.status(200).json(result);
            });
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;