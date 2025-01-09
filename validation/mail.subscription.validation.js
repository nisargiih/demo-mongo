const Joi = require("joi");

const email_validation_schema = Joi.object({
  email: Joi.string().email().messages({
    "string.email": "Please enter valid email",
    "any.required": "Email is required",
    "string.empty": "Email is required",
  }),
});

module.exports = { email_validation_schema };
