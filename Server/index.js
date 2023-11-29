const express = require('express');
const dotenv = require('dotenv').config()
const mongoose = require('mongoose');
const cors = require('cors');
//import TodoModel from './Models/Todo';
const CategoryModel = require('./Models/Category');
// const MiscellaneousModel = require('./Models/Miscellaneous');
//const UserModel = require('./Models/User');
const cookieParser = require('cookie-parser')

const app = express()

mongoose.connect(process.env.MONGO_URL)

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))

app.use('/', require('./routes/authRoutes'))

app.listen(5174, () => {
    console.log('Server is running')
});