const Joi = require("joi");

const create_product_schema = Joi.object({
  product_name: Joi.string().required().messages({
    "any.required": "Proudct name is required",
    "string.empty": "Product name is required",
  }),
  product_price: Joi.number().min(1).required().messages({
    "any.required": "Product price is required",
    "number.empty": "Product price is required",
    "number.base": "Product price must be valid",
    "number.min": "Product price must be greater than or equal to 1.",
  }),
  product_discount: Joi.number().messages({
    "number.empty": "Product discount is required",
  }),
  is_product_out_of_stock: Joi.boolean().messages({
    "boolean.empty": "Product stock value can't be empty",
  }),
});

const update_product_schema = Joi.object({
  product_name: Joi.string().messages({
    "string.empty": "Product name is required",
  }),
  product_price: Joi.number().min(1).messages({
    "number.empty": "Product price is required",
    "number.base": "Product price must be valid",
    "number.min": "Product price must be greater than or equal to 1.",
  }),
  product_discount: Joi.number().messages({
    "number.empty": "Product discount is required",
  }),
  is_product_out_of_stock: Joi.boolean().messages({
    "boolean.empty": "Product stock value can't be empty",
  }),
  product_image_delete: Joi.array().messages({
    "array.empty": "Product delete can't be empty",
  }),
});
module.exports = {
  create_product_schema,
  update_product_schema,
};
