const { register_user, login_user, verify_email_address, resend_verification_link, verify_otp, resend_otp } = require("../controller/auth.controller")
const { auth_middle_ware } = require("../middleware/auth.middleware")

const route = require("express").Router()


route.post('/register', register_user)
route.post('/login', login_user)
route.post('/verify-email/:token', verify_email_address)
route.post('/resend-verification-link', resend_verification_link)
route.post('/verify-otp', auth_middle_ware, verify_otp)
route.post('/resend-otp', auth_middle_ware, resend_otp)

module.exports = route