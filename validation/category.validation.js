const Joi = require("joi");

const create_category_schema = Joi.object({
  category_name: Joi.string().required().messages({
    "any.required": "Categoty name is required",
    "string.empty": "Categoty name is required",
  }),
});

const update_category_schema = Joi.object({
  category_name: Joi.string().required().messages({
    "any.required": "Categoty name is required",
    "string.empty": "Categoty name is required",
  }),
  _id: Joi.string().required().messages({
    "string.empty": "Categoty id is required",
    "any.required": "Categoty id is required",
  }),
});
module.exports = { create_category_schema, update_category_schema };
