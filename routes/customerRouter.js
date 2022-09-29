const express = require('express');

const router = express.Router();
const Customer = require('../models/customer');

router.post('/post', async (req, res) => {
    try {

        var customerWithName = await Customer.findOne({ name: req.body.name });
        if (customerWithName) {
            res.status(400).json([{
                errorCode: '[FieldIsUnique]',
                field: 'name'
            }])
        }
        else {
            const data = new Customer({
                name: req.body.name,
                description: req.body.description
            })
            const dataToSave = await data.save();
            res.status(200).json(dataToSave)
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/getAll', async (req, res) => {
    try {
        const data = await Customer.find();
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/get/:id', async (req, res) => {
    try {
        const data = await Customer.findById(req.params.id);
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

        Customer.findByIdAndUpdate(
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
        Customer.findByIdAndDelete(id)
        .then((result) => {
            res.status(200).json(result);
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;