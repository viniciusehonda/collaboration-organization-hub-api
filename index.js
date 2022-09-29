require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoString = process.env.DATABASE_URL;
const baseApiRoute = '/api';
const authenticationRouter = require('./routes/authentication')
const customerRouter = require('./routes/customerRouter')
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

app.use(express.json())
.use(cors({
    origin: '*'
}));

app.listen(3000, () => {
    console.log('Server Started at ${3000}')
})

app.use(`${baseApiRoute}/authentication`, authenticationRouter)
    .use(`${baseApiRoute}/customer`, auth, customerRouter)
    .use(`${baseApiRoute}/user`, auth, userRouter);