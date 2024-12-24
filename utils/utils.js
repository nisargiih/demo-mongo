const jwt = require("jsonwebtoken")

const generate_jwt_token = (data, expiry) => {
    const options = {};
    if (expiry) {
        options.expiresIn = expiry;
    }

    const token = jwt.sign(data, process.env.JWT_SECRET, options)

    return token
}

const verify_jwt_token = (token) => {
    const data = jwt.verify(token, process.env.JWT_SECRET)
    return data
}

const generate_otp = () => {
    return Math.floor(Math.random() * 10000000)
}
module.exports = { generate_jwt_token, verify_jwt_token, generate_otp }