const { Schema, default: mongoose } = require("mongoose");

const categorySchema = new Schema({
    category_name: {
        type: String,
        require: true
    },
    category_img: {
        type: String
    }
}, { timestamps: true })


const Category = mongoose.model('category', categorySchema)

module.exports = Category