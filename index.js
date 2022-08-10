require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const baseApiRoute = '/api';
const authenticationRouter = require('./routes/authentication')
const companyRouter = require('./routes/companyRouter')
const userRouter = require('./routes/userRouter')
const auth = require("./middleware/auth")

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server Started at ${3000}')
})

app.use(`${baseApiRoute}/authentication`, authenticationRouter)
    .use(`${baseApiRoute}/company`, companyRouter)
    .use(`${baseApiRoute}/user`, userRouter);