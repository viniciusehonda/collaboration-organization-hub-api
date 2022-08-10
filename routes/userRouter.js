const express = require('express');

const router = express.Router();
const User = require('../models/user');

router.get('/getAll', async (req, res) => {
    try {
        const data = await User.find();
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/get/:id', async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
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

        Company.findByIdAndUpdate(
            id, 
            { firstName: updatedData.firstName, lastName: updatedData.lastName },
            options
            ).then((result) => {
                res.status(200).send(result)
            })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;