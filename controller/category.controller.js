const Category = require("../model/category.model")
const { error_response, success_message } = require("../utils/common.response")

const create_category = async (req, res) => {
    try {
        const { category_name, category_img } = req.body

        await Category.create({
            category_name,
            category_img
        })

        return success_message(res, "Category created successfully")
    } catch (error) {
        return error_response(res, error)
    }
}

const update_category = async (req, res) => {
    try {
        const { category_name, category_img, _id } = req.body

        await Category.updateOne({ _id }, {
            $set: {
                category_name, category_img
            }
        })

        return success_message(res, "Category updated successfully")
    } catch (error) {
        return error_response(res, error)
    }
}

const delete_category = async (req, res) => {
    try {
        const { _id } = req.body

        await Category.findByIdAndDelete(_id)

        return success_message(res, "Category deleted successfully")
    } catch (error) {
        return error_response(res, error)
    }
}

const all_category = async (req, res) => {
    try {
        const { limit, search, offset } = req.body

        const category = await Category.find({ category_name: { $regex: search } }).limit(limit).skip(offset)
        
        console.log(category)
    } catch (error) {
        return error_response(res, error)
    }
}
module.exports = { create_category, update_category, delete_category, all_category }