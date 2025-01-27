const User = require("../model/user.model");
const {
  success_message,
  custom_error_response,
  success_response,
} = require("../utils/common.response");
const { asyncHandler, generate_otp } = require("../utils/utils");

// TODO UPDATE MOBILE NUMBER AND EMAIL
const update_profile = asyncHandler(async (req, res) => {
  const { first_name, last_name, phone_number } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return custom_error_response(res, "User not found", 401);
  }

  if (!user.is_verified_phone_number) {
    return custom_error_response(res, "User not found");
  }

  await User.findById(req?.user?._id, {
    first_name,
    last_name,
    phone_number,
  });

  return success_message(res, "Profile updated successfully");
});

// TODO NEED TO THINK HOW TO UPDATE MOBILE NUMBER AND EMAIL
const verify_email_or_phone_number = asyncHandler(async (req, res) => {
  const { phone_number, email } = req.body;
  const user = await User.findById(req?.user?._id);
  const current_time = new Date();
  const resend_otp_time_duration = 1 * 60 * 1000;
  const time_diffrence =
    current_time -
    (phone_number ? user?.phone_otp_send_time : user?.otp_send_time);

  if (time_diffrence < resend_otp_time_duration) {
    return custom_error_response(
      res,
      "You can request for another otp after 1 min"
    );
  }

  const otp = generate_otp();
  const otp_send_time = new Date();

  let payload = {
    is_change_email_or_phone_number: true,
  };

  if (phone_number) {
    payload.phone_otp = otp;
    payload.phone_otp_send_time = otp_send_time;
  } else {
    payload.otp = otp;
    payload.otp_send_time = otp_send_time;
  }

  await User.findByIdAndUpdate(req?.user?._id, payload);

  return success_message(res, "Otp send to your mobile number");
});

const verify_otp_for_profile = asyncHandler(async (req, res) => {
  const { otp, is_phone_otp = false } = req.body;

  const user = await User.findById(req?.user?._id);

  const current_time = new Date();
  const otp_expiry_time = 5 * 60 * 1000; // Five min
  const otp_time =
    current_time -
    (is_phone_otp ? user.phone_otp_send_time : user.otp_send_time);
  const user_otp = is_phone_otp ? user.phone_otp : user.otp;

  if (parseInt(user_otp) !== parseInt(otp)) {
    return custom_error_response(res, "Invalid otp");
  }

  if (otp_time > otp_expiry_time) {
    return custom_error_response(res, "Otp is expired");
  }

  let payload = {
    is_change_email_or_phone_number: false,
  };

  if (is_phone_otp) {
    payload.is_verified_phone_number = true;
  } else {
    payload.is_verified_email = true;
  }

  await User.findByIdAndUpdate(req.user._id, payload);

  return success_message(res, "Verified successfully");
});

const user_list = asyncHandler(async (req, res) => {
  const { limit = 10, search, page = 1 } = req.body;

  const offset = (page - 1) * limit;
  if (search) {
    payload.category_name = {
      $regex: search,
    };
  }
  const user = await User.find(payload).limit(limit).skip(offset);

  return success_response(res, "", { data: user });
});

module.exports = {
  update_profile,
  verify_email_or_phone_number,
  verify_otp_for_profile,
  user_list,
};
