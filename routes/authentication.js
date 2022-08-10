require('dotenv-safe').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const { cryptPassword, comparePassword } = require('../security/encrypt')

const router = express.Router();

router.post('/authenticate', async (req, res) => {

    try {
        const credentials = {
            email: req.body.email,
            password: req.body.password
        }

        if (!(credentials.email && credentials.password)) {
            res.status(400).send([{
                errorCode: '[LoginCredentialsRequired]',
                field: '*'
            }])
        }

        const dbUser = await user.findOne({ email: credentials.email }).select('+password').exec();

        if (user) {

            comparePassword(credentials.password, dbUser.password, (err, isPasswordMatch) => {

                if (err) {
                    console.log(err);
                    res.status(500);
                }

                if (isPasswordMatch === true) {
                    const token = generateToken({ user_id: dbUser._id, email: dbUser.email });
                    res.status(200).json({
                        token: token,
                        userId: dbUser._id,
                        firstName: dbUser.firstName,
                        lastName: dbUser.lastName
                    });
                }
                else {
                    res.status(400).send([{
                        errorCode: '[LoginCredentialsInvalid]',
                        field: '*'
                    }])
                }
            })
        }
        else {
            res.status(400).send([{
                errorCode: '[LoginCredentialsInvalid]',
                field: '*'
            }])
        }

    } catch (err) {
        console.log(err);
        res.status(500);
    }
})

router.post('/register', async (req, res) => {

    try {

        const { firstName, lastName, email, password } = req.body;

        if (!(firstName && lastName && email && password)) {
            res.status(400).send([{
                errorCode: '[FieldRequired]',
                field: '*'
            }])
        }

        const existentUser = await user.findOne({ email });

        if (existentUser) {
            return res.status(409).send([{
                errorCode: '[AuthUserExists]',
                field: 'email'
            }])
        }

        cryptPassword(password, async (err, hash) => {

            if (err) {
                console.log(err);
                res.status(500);
            }

            const newUser = await user.create({
                firstName,
                lastName,
                email: email.toLowerCase(),
                password: hash
            });

            const token = generateToken({ user_id: newUser._id, email: newUser.email });

            res.status(201).json({
                token: token,
                userId: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName
            });
        });

    } catch (err) {
        console.log(err);
        res.status(500);
    }
})

function generateToken(payload) {

    return jwt.sign(
        payload,
        process.env.SECRET,
        {
            expiresIn: "2h",
        }
    );
}

module.exports = router;