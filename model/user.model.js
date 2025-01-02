const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
    },
    otp_send_time: {
      type: Date,
    },
    phone_number: {
      type: String,
      unique: true,
    },
    phone_otp: {
      type: Number,
    },
    phone_otp_send_time: {
      type: Date,
    },
    is_verified_email: {
      type: Boolean,
      default: false,
    },
    is_verified_phone_number: {
      type: Boolean,
      default: false,
    },
    is_supplier: {
      type: Boolean,
      default: false,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    is_change_email_or_phone_number: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
