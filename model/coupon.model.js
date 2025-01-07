const { Schema, default: mongoose } = require("mongoose");

const couponSchema = new Schema({
  coupon_code: {
    type: String,
    require: true,
    unique: true,
  },
  coupon_description: {
    type: String,
  },
  discount_type: {
    type: String,
    enum: ["PERCENTAGE", "FIXED"],
    require: true,
  },
  discount_value: {
    type: Number,
    require: true,
  },
  max_discount: {
    type: Number,
    default: null,
  },
  min_discount: {
    type: Number,
    default: null,
  },
  usage_limit: {
    type: Number,
    default: null,
  },
  used_count: {
    type: Number,
    default: 0,
  },
  user_used: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  is_active: {
    type: Boolean,
    default: true,
  },
  start_date: {
    type: Date,
  },
  expiry_date: {
    type: Date,
  },
  is_one_time_use: {
    type: Boolean,
    default: false,
  },
  min_value_order: {
    type: Number,
    default: null,
  },
});

const Coupon = mongoose.model("coupon", couponSchema);

module.exports = Coupon;
