const User = require("../model/user.model");
const {
  error_response,
  success_message,
  success_response,
  custom_error_response,
} = require("../utils/common.response");
const {
  generate_jwt_token,
  verify_jwt_token,
  generate_otp,
} = require("../utils/utils");

// ================================ REGISTER ================================
const register_user = async (req, res) => {
  try {
    // check if user is exist or not
    const find_user = await User.findOne({
      email: req.body.email,
    });

    if (find_user) {
      return custom_error_response(res, "Email id alredy exist");
    }

    // create new user
    await User.create({
      email: req.body.email,
      last_name: req.body.last_name,
      first_name: req.body.first_name,
    });

    // TODO SEND EMAIL FOR VERIFICATION LINK
    // GENERATING TEMP TOKEN FOR
    // valid for 5 min
    const token = generate_jwt_token(
      {
        email: req.body.email,
        is_verified: false,
      },
      500000
    );

    // TODO REMOVE TOKEN FROM RESPONSE
    return success_response(res, "Register successfully", { token });
  } catch (error) {
    return error_response(res, error);
  }
};

// ================================ LOGIN ================================
const login_user = async (req, res) => {
  try {
    // finding iser
    const find_user = await User.findOne({ email: req.body.email });

    // checking if user email is verified or not
    if (!find_user.is_verified_email) {
      return custom_error_response(res, "Your account is not verified");
    }

    // otp & current date
    const otp = generate_otp();
    const otp_send_time = new Date();

    // save otp and otp send time
    await User.updateOne(
      {
        email: req.body.email,
      },
      { $set: { otp, otp_send_time } }
    );

    // generating token
    const token = generate_jwt_token({
      email: req.body.email,
      is_verified: false,
    });
    return success_response(res, "Otp sent to your register email address", {
      token,
    });
  } catch (error) {
    return error_response(res, error);
  }
};

// ================================ VERIFY EMAIL ADDRESS ================================
const verify_email_address = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return custom_error_response(res, "Token is missing");
    }

    // verify JWT token
    const user = verify_jwt_token(token);

    // update user information
    await User.updateOne(
      {
        email: user.email,
      },
      { $set: { is_verified_email: true } }
    );

    return success_message(res, "Email verified successfully");
  } catch (error) {
    return error_response(res, error);
  }
};

// ================================ RESEND VERIFICATION LINK ================================
const resend_verification_link = async (req, res) => {
  try {
    // TODO SEND MAIL FOR VERIFICATION LINK
    // valid for 5 min
    const token = generate_jwt_token(
      {
        email: req.body.email,
        is_verified: false,
      },
      500000
    );

    return success_response(res, "Verification link sent", token);
  } catch (error) {
    return error_response(res, error);
  }
};

// ================================ VERIFY OTP ================================
const verify_otp = async (req, res) => {
  try {
    const { email } = req.user;
    const { otp } = req.body;
    // find user
    const user = await User.findOne({ email });
    if (parseInt(user?.otp) != parseInt(otp)) {
      return custom_error_response(res, "Invalid otp");
    }

    // current_time & otp expiry time & calculating time gap
    const current_time = new Date();
    const otp_expiry_time = 5 * 60 * 1000; // Five min
    const otp_time = current_time - user.otp_send_time;

    // check if otp is expire or not
    if (otp_time > otp_expiry_time) {
      return custom_error_response(res, "Otp is expired");
    }

    // generate actual token
    const token = generate_jwt_token({
      email: email,
      is_verified: true,
      id: user._id,
    });

    return success_response(res, "Otp verified successfully", token);
  } catch (error) {
    return error_response(res, error);
  }
};

// ================================ RESEND OTP ================================
const resend_otp = async (req, res) => {
  try {
    const { email } = req.user;

    // generating otp
    const otp = generate_otp();

    // current date and time
    const otp_send_time = new Date();

    // update use with new otp and otp send time
    await User.updateOne(
      {
        email,
      },
      { $set: { otp, otp_send_time } }
    );

    return success_message(res, "Otp send successfully");
  } catch (error) {
    return error_response(res, error);
  }
};

module.exports = {
  register_user,
  login_user,
  verify_email_address,
  resend_verification_link,
  verify_otp,
  resend_otp,
};
