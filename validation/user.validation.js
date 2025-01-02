const Joi = require("joi");

const update_user_schema = Joi.object({
  first_name: Joi.string().required().messages({
    "any.required": "First name is required",
    "string.empty": "First name is required",
  }),
  last_name: Joi.string().required().messages({
    "any.required": "Last name is required",
    "string.empty": "Last name is required",
  }),
  email: Joi.string().email().messages({
    "string.email": "Please enter valid email",
    "any.required": "Email is required",
    "string.empty": "Email is required",
  }),
  phone_number: Joi.number()
    .min(10)
    .message("Enter valid phone number")
    .messages({
      "any.required": "Phone number is required",
      "number.empty": "Phone number is required",
    }),
});

const verify_email_or_phone_number_schema = Joi.object({
  email: Joi.string().email().messages({
    "string.email": "Please enter valid email",
    "any.required": "Email is required",
    "string.empty": "Email is required",
  }),
  phone_number: Joi.number()
    .min(10)
    .message("Enter valid phone number")
    .messages({
      "any.required": "Phone number is required",
      "number.empty": "Phone number is required",
    }),
})
  .or("email", "phone_number")
  .messages({
    "object.missing": "Either phone number or email is required",
  });

const verify_otp_for_profile_schema = Joi.object({
  otp: Joi.number().min(6).required().messages({
    "number.empty": "Otp is required",
    "number.min": "Invalid otp length",
    "any.required": "Otp is required",
  }),
  is_phone_otp: Joi.boolean().messages({
    "boolean.empty": "Product increase flag is required",
  }),
});

module.exports = {
  update_user_schema,
  verify_email_or_phone_number_schema,
  verify_otp_for_profile_schema,
};
