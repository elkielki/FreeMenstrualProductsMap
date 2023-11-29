const mongoose = require('mongoose');
const {TodoModel, TodoSchema} = require('./Todo');
/*
const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Not Started"
    },
    category: {
        type: String,
        default: "Uncategorized"
    }
})  */

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    todos: {
        type: [TodoSchema],
        default: [],
    },
    filter: {
        type: Boolean,
        default: false,
    },
    categories: {
        type: [String],
        default: ["Uncategorized"]
    }
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