const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    }
})

const CategoryModel = mongoose.model("categories", CategorySchema)

module.exports = CategoryModel