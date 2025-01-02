const {
  update_profile,
  verify_email_or_phone_number,
  verify_otp_for_profile,
} = require("../controller/user.controller");
const { user_middleware } = require("../middleware/auth.middleware");
const validate_response = require("../middleware/validation.middleware");
const {
  update_user_schema,
  verify_email_or_phone_number_schema,
  verify_otp_for_profile_schema,
} = require("../validation/user.validation");

const route = require("express").Router();

route.put(
  "/update-profile",
  user_middleware,
  validate_response(update_user_schema),
  update_profile
);
route.post(
  "/send-otp-for-verification",
  user_middleware,
  validate_response(verify_email_or_phone_number_schema),
  verify_email_or_phone_number
);
route.post(
  "/verify-otp-for-profile",
  user_middleware,
  validate_response(verify_otp_for_profile_schema),
  verify_otp_for_profile
);

module.exports = route;
