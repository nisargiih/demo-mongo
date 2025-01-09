const Joi = require("joi");

const create_coupon_schema = Joi.object({
  coupon_code: Joi.string().required().messages({
    "string.empty": "Coupon name is required",
    "any.required": "Coupon name is required",
  }),
  coupon_description: Joi.string().messages({
    "string.empty": "Coupon description is required",
  }),
  discount_value: Joi.number()
    .required()
    .when("discount_type", {
      is: "PERCENTAGE",
      then: Joi.number().greater(9).less(100).messages({
        "number.base": "Discount value must be a number",
        "number.greater":
          "Discount value must be greater than 10 for percentage type",
        "number.less":
          "Discount value must be less than 100 for percentage type",
        "any.required": "Discount value is required",
      }),
      otherwise: Joi.required().messages({
        "number.empty": "Discount value is required",
        "any.required": "Discount value is required",
      }),
    }),
  max_discount: Joi.number()
    .required()
    .when("discount_type", {
      is: "PERCENTAGE",
      then: Joi.required().messages({
        "number.empty": "Max discount is required for percentage type",
        "any.required": "Max discount is required for percentage type",
      }),
      otherwise: Joi.optional().messages({
        "number.empty": "Max discount value is required111",
      }),
    }),
  min_discount: Joi.number()
    .when("discount_type", {
      is: "PERCENTAGE",
      then: Joi.required().messages({
        "number.empty": "Min discount is required for percentage type",
        "any.required": "Min discount is required for percentage type",
      }),
      otherwise: Joi.optional().messages({
        "number.empty": "Min discount is required",
      }),
    })
    .messages({
      "number.empty": "Max discount is required",
    }),
  min_value_order: Joi.number().required().messages({
    "number.empty": "Minimum order value is required",
    "any.required": "Minimum order value is required",
  }),
  usage_limit: Joi.number().messages({
    "number.empty": "Usage limit is required",
  }),
  is_active: Joi.boolean().messages({
    "boolean.empty": "Active status is required",
  }),
  discount_type: Joi.string().valid("PERCENTAGE", "FIXED").required().messages({
    "any.only": "Invalid discount type. Allowed values are FIXED or NOT FIXED.",
  }),
  start_date: Joi.date().greater("now").required().messages({
    "date.base": "Start date must be a valid date.",
    "date.greater": "Start date cannot be in the past.",
    "any.required": "Start date is required.",
  }),
  expiry_date: Joi.date().greater(Joi.ref("start_date")).required().messages({
    "date.base": "Expiry date must be a valid date.",
    "date.greater":
      "Expiry date must be later than the start date and cannot be in the past.",
    "any.required": "Expiry date is required.",
  }),
  is_one_time_use: Joi.boolean().messages({
    "boolean.empty": "Vale is required is required",
  }),
});

module.exports = { create_coupon_schema };
