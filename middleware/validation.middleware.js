const {
  custom_error_response,
  validation_error,
  error_response,
} = require("../utils/common.response");
const { revert_uploaded_file_if_error } = require("./multer.middleware");

const validate_response = (schema) => (req, res, next) => {
  try {
    if (!schema) {
      return custom_error_response(res, "Payload data not found");
    }

    const { error } = schema.validate(req.body);
    if (error?.message) {
      if (req?.local) {
        req.error_message = "VALIDATION_ERROR";
        return revert_uploaded_file_if_error(req, res, next);
      }
      return validation_error(res, error?.message || "Validation error");
    }

    next();
  } catch (error) {
    return error_response(res, error);
  }
};

module.exports = validate_response;
