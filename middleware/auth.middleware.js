const User = require("../model/user.model");
const { error_response, custom_error_response } = require("../utils/common.response");
const { verify_jwt_token } = require("../utils/utils");

/*
    This middleware will pass only un authenticate screen
    NOTE : For middleware user only 401 status code 
*/
const auth_middle_ware = async (req, res, next) => {
    try {

        // Getting token
        const auth_header = req?.headers?.authorization

        // send error if token is not available
        if (!auth_header) {
            return custom_error_response(res, "Token not found", 401)
        }

        const token = req.headers.authorization.split(" ")[1];

        // verify token
        const user_data = verify_jwt_token(token, process.env.JWT_SECRET)

        // send error if token is expire
        if (!user_data) {
            return custom_error_response(res, "Session expire", 401)
        }

        // set token data in req.user parameter
        req.user = { email: user_data.email }

        next();
    } catch (error) {
        return error_response(res, error)
    }
}


const user_middleware = async (req, res, next) => {
    try {

        // Getting token
        const auth_header = req?.headers?.authorization

        if (!auth_header) {
            return custom_error_response(res, "Token not found", 401)
        }

        const token = req.headers.authorization.split(" ")[1];

        // verify token
        const user_data = verify_jwt_token(token, process.env.JWT_SECRET)

        // send error if token is expire
        if (!user_data) {
            return custom_error_response(res, "Session expire", 401)
        }

        if (!user_data?.is_verified) {
            return custom_error_response(res, "Your account is not verified", 401)
        }

        const user = await User.findOne({ email: user_data.email })

        // set token data in req.user parameter
        req.user = user

        next();
    } catch (error) {
        return error_response(res, error)
    }
}

const admin_middleware = async () => {
    try {

        // Getting token
        const auth_header = req?.headers?.authorization

        if (!auth_header) {
            return custom_error_response(res, "Token not found", 401)
        }

        const token = req.headers.authorization.split(" ")[1];

        // verify token
        const user_data = verify_jwt_token(token, process.env.JWT_SECRET)

        // send error if token is expire
        if (!user_data) {
            return custom_error_response(res, "Session expire", 401)
        }

        // Check is user mail id is verified or not
        if (!user_data?.is_verified) {
            return custom_error_response(res, "Your account is not verified", 401)
        }

        // Getting user data 
        const user = await User.findOne({ email: user_data.email })

        // Check if user is admin 
        if (!user?.is_admin) {
            return custom_error_response(res, "Invalid token", 401)
        }

        // set token data in req.user parameter
        req.user = user

        next();
    } catch (error) {
        return error_response(res, error)
    }
}

const supplier_middleware = async () => {
    try {

        // Getting token
        const auth_header = req?.headers?.authorization

        if (!auth_header) {
            return custom_error_response(res, "Token not found", 401)
        }

        const token = req.headers.authorization.split(" ")[1];

        // verify token
        const user_data = verify_jwt_token(token, process.env.JWT_SECRET)

        // send error if token is expire
        if (!user_data) {
            return custom_error_response(res, "Session expire", 401)
        }

        // check if user is verified or not
        if (!user_data?.is_verified) {
            return custom_error_response(res, "Your account is not verified", 401)
        }

        // getting user data
        const user = await User.findOne({ email: user_data.email })

        // Check user is supplier or not
        if (!user?.is_supplier) {
            return custom_error_response(res, "Invalid token", 401)
        }

        // set token data in req.user parameter
        req.user = user

        next();
    } catch (error) {
        return error_response(res, error)
    }
}
module.exports = { auth_middle_ware, user_middleware, admin_middleware, supplier_middleware }