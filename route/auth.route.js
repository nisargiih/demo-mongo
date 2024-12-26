const { register_user, login_user, verify_email_address, resend_verification_link, verify_otp, resend_otp } = require("../controller/auth.controller")
const { auth_middle_ware } = require("../middleware/auth.middleware")
const validate_response = require("../middleware/validation.middleware")
const { register_validation_schema, login_validation_schema, verify_otp_schema } = require("../validation/auth.validation")

const route = require("express").Router()


route.post('/register',validate_response(register_validation_schema), register_user)
route.post('/login',validate_response(login_validation_schema), login_user)
route.post('/verify-email/:token',verify_email_address)
route.post('/resend-verification-link', validate_response(login_validation_schema),resend_verification_link)
route.post('/verify-otp', auth_middle_ware,validate_response(verify_otp_schema), verify_otp)
route.post('/resend-otp', auth_middle_ware, resend_otp)

module.exports = route