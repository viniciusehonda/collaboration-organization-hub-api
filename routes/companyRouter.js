const express = require('express');

const router = express.Router();
const Company = require('../models/company');

router.post('/post', async (req, res) => {
    try {

        var companyWithName = await Company.findOne({ name: req.body.name });
        if (companyWithName) {
            res.status(400).json([{
                errorCode: '[FieldIsUnique]',
                field: 'name'
            }])
        }
        else {
            const data = new Company({
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
        const data = await Company.find();
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/get/:id', async (req, res) => {
    try {
        const data = await Company.findById(req.params.id);
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
        Company.findByIdAndDelete(id)
        .then((result) => {
            res.status(200).json(result);
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;