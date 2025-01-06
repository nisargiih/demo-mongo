const Coupon = require("../model/coupon.model");
const { success_message } = require("../utils/common.response");
const { asyncHandler } = require("../utils/utils");

const create_coupon = asyncHandler(async (req, res) => {
  const {
    coupon_code,
    discount_type,
    discount_value,
    max_discount,
    min_discount,
    usage_limit,
    is_active,
    start_date,
    expiry_date,
  } = req.body;

  await Coupon.create({
    coupon_code,
    discount_type,
    discount_value,
    max_discount,
    min_discount,
    usage_limit,
    is_active,
    start_date,
    expiry_date,
  });

  return success_message(res, "Coupon created successfully");
});

const update_coupon = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const {
    coupon_code,
    discount_type,
    discount_value,
    max_discount,
    min_discount,
    usage_limit,
    is_active,
    start_date,
    expiry_date,
  } = req.body;

  await Coupon.findOneAndUpdate(_id, {
    coupon_code,
    discount_type,
    discount_value,
    max_discount,
    min_discount,
    usage_limit,
    is_active,
    start_date,
    expiry_date,
  });

  return success_message(res, "Coupon updated successfully");
});

const delete_coupon = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  await Coupon.findOneAndDelete(_id);

  return success_message(res, "Coupon deleted successfully");
});

const list_coupon = asyncHandler(async (req, res) => {
  const {
    limit = 10,
    search,
    page = 1,
    start_date,
    end_date,
    is_active,
  } = req.body;

  const offset = limit * (page - 1);
  const match = {};
  const pipeline = [];

  if (search) {
    match.coupon_code = {
      $regex: search,
    };
  }

  if (start_date) {
    match.start_date = {
      $gte: start_date,
    };
  }

  if (end_date) {
    match.end_date = {
      $lte: end_date,
    };
  }
});

module.exports = {
  create_coupon,
  update_coupon,
  delete_coupon,
};
