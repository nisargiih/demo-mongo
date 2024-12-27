const { Schema, default: mongoose } = require("mongoose");

const categorySchema = new Schema({
    category_name: {
        type: String,
        require: true
    },
    category_img: {
        type: String
    },
    category_available: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })


const Category = mongoose.model('category', categorySchema)

module.exports = Category