const Joi = require("joi");

// =============================== REGISTER VALIDATION SCHEMA =============================== 
const register_validation_schema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Please enter valid email",
        "any.required": "Email is required",
        'string.empty': "Email is required"
    }),
    first_name: Joi.string().required().messages({
        "any.required": "First name is required",
        'string.empty': "First name is required"
    }),
    last_name: Joi.string().required().messages({
        "any.required": "Last name is required",
        'string.empty': "Last name is required"
    })
})
// =============================== LOGIN VALIDATION SCHEMA ===============================
const login_validation_schema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Please enter valid email",
        "any.required": "Email is required",
        'string.empty': "Email is required"
    })
})

// =============================== VERIFY OTP VALIDATION SCHEMA ===============================
const verify_otp_schema = Joi.object({
    otp: Joi.string().min(6).required().messages({
        "string.empty": "Otp is required",
        "string.min": "Invalid otp length",
        "any.required": "Otp is required"
    })
})
module.exports = { register_validation_schema, login_validation_schema, verify_otp_schema }