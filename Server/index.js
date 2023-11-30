const express = require('express');
const dotenv = require('dotenv').config()
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const CategoryModel = require('./Models/Category');

const app = express()

mongoose.connect(process.env.MONGO_URL)

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))

app.use('/', require('./routes/authRoutes'))

app.listen(5174, () => {
    console.log('Server is running')
});