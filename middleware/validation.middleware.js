const { custom_error_response, validation_error, error_response } = require("../utils/common.response")

const validate_response = (schema) => (req, res, next) => {
    try {
        if (!schema) {
            return custom_error_response(res, "Payload data not found")
        }

        const { error,value } = schema.validate(req.body)

        if (error?.message) {
            return validation_error(res, error.message)
        }

        next()
    } catch (error) {
        return error_response(res, error)
    }
}

module.exports = validate_response