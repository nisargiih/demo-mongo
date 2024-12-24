const error_response = (res, error) => {
    return res.status(422).json({
        status: false,
        message: error.message
    })
}

const validation_error = (res, message) => {
    return res.status(400).json({
        status: false,
        message
    })
}

const success_message = (res, message) => {
    return res.status(200).json({
        status: true,
        message
    })
}

const success_response = (res, message, data) => {
    return res.status(200).json({
        status: true,
        message,
        data
    })
}

const custom_error_response = (res, message, status_code = 403) => {
    return res.status(status_code).json({
        status: false,
        message
    })
}
module.exports = {
    error_response,
    validation_error,
    success_message,
    success_response,
    custom_error_response
}