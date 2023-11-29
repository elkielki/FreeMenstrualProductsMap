const mongoose = require('mongoose');

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
})

const TodoModel = mongoose.model("todos", TodoSchema)

module.exports = {TodoModel, TodoSchema};