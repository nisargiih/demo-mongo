const Joi = require("joi");

const address_validation_schema = Joi.object({
  user_id: Joi.string().required().messages({
    "string.empty": "Address is required",
    "any.required": "Address is required",
  }),
  city: Joi.string().required().messages({
    "string.empty": "City name is required",
    "any.required": "City name required",
  }),
  state: Joi.string().required().messages({
    "string.empty": "State name is required",
    "any.required": "State name required",
  }),
  pincode: Joi.number().required().max(6).min(6).messages({
    "number.required": "Pincode is required",
    "any.required": "Pincode is required",
    "number.min": "Please enter valid pincode",
    "number.max": "Please enter valid pincode",
  }),
});

module.exports = { address_validation_schema };
