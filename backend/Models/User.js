const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String
})

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel


/*  
userId: {
        type: String,
        required: true
    }, 
    filter: {
        type: Boolean,
        default: false
    },
    todo: {
        type: [TodoSchema]
    },
    category: {
        type: [String]
    },

*/