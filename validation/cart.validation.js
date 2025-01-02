const Joi = require("joi");

const add_or_remove_quantity_schema = Joi.object({
  product_id: Joi.string().required().messages({
    "string.empty": "Product id is required",
    "any.required": "Product id is required",
  }),
  is_decrease_quantity: Joi.boolean().messages({
    "boolean.empty": "Product increase flag is required",
  }),
});

module.exports = { add_or_remove_quantity_schema };
