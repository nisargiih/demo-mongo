const Joi = require("joi");

const create_category_schema = Joi.object({
    category_name: Joi.string().required().messages({
        "any.required": "Categoty name is required",
        'string.empty': "Categoty name is required"
    }),
    category_img: Joi.string().required().messages({
        'string.empty': "Categoty image is required"
    })
})

module.exports = { create_category_schema }