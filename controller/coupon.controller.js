const Coupon = require("../model/coupon.model");
const Order = require("../model/order.model");
const {
  success_message,
  success_response,
  custom_error_response,
} = require("../utils/common.response");
const { asyncHandler } = require("../utils/utils");
const moment = require("moment");

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
    min_value_order,
    coupon_description,
  } = req.body;

  const coupon = await Coupon.findOne({
    coupon_code,
  });

  if (coupon) {
    return custom_error_response(res, "Coupon name is alreday exist");
  }

  const formatted_start_date = moment(start_date, "DD/MM/YYYY").toISOString();
  const formatted_expiry_date = moment(expiry_date, "DD/MM/YYYY").toISOString();

  await Coupon.create({
    coupon_code,
    discount_type,
    discount_value,
    max_discount,
    min_discount,
    usage_limit,
    is_active,
    start_date: formatted_start_date,
    expiry_date: formatted_expiry_date,
    min_value_order,
    coupon_description,
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
    min_value_order,
    coupon_description,
  } = req.body;

  const coupon = await Coupon.findOne({
    coupon_code,
  });

  if (coupon) {
    return custom_error_response(res, "Coupon name is alreday exist");
  }

  const formatted_start_date = new Date(start_date).toISOString();
  const formatted_expiry_date = new Date(expiry_date).toISOString();

  await Coupon.findOneAndUpdate(_id, {
    coupon_code,
    discount_type,
    discount_value,
    max_discount,
    min_discount,
    usage_limit,
    is_active,
    start_date: formatted_start_date,
    expiry_date: formatted_expiry_date,
    min_value_order,
    coupon_description,
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

  if (Object.keys(match).length > 0) {
    pipeline.push({
      $match: match,
    });
  }

  pipeline.push(
    {
      $skip: offset,
    },
    {
      $limit: parseInt(limit),
    }
  );

  const coupon = await Coupon.aggregate(pipeline);

  return success_response(res, "", { data: coupon });
});

const apply_coupon = asyncHandler(async (req, res) => {
  const { coupon_code, order_id } = req.body;

  const order = await Order.findById(order_id);

  if (!order) {
    return custom_error_response(res, "Order not found");
  }

  const price = order.total_price;

  const coupon = await Coupon.findOne({
    coupon_code,
  });

  if (!coupon || !coupon.is_active) {
    return custom_error_response(res, "Please enter valid coupon");
  }

  if (coupon?.min_value_order && coupon.min_value_order > price) {
    return custom_error_response(
      res,
      `The minimum order value for this offer is ${coupon.min_value_order}`
    );
  }

  if (
    moment(coupon.expiry_date).isBefore(moment()) ||
    coupon.used_count >= coupon.usage_limit
  ) {
    return custom_error_response(res, "Coupon code is expired");
  }

  if (coupon.is_one_time_use) {
    const is_used = coupon.user_used.find(
      (id) => id.toString() === (req?.user?._id).toString()
    );

    if (is_used) {
      return custom_error_response(res, "This coupon can only be used once");
    }
  }
  let final_price = null;
  let message = null;
  if (coupon.discount_type === "PERCENTAGE") {
    const discount_calculation = (price * coupon.discount_value) / 100;
    const discount_price =
      discount_calculation > coupon.max_discount
        ? coupon.max_discount
        : discount_calculation < coupon.min_discount
        ? coupon.min_discount
        : discount_calculation;

    final_price = price - discount_price;
    message = `Congratulations on your savings! You've saved ${discount_price} Rs on your order`;
  }

  if (coupon.discount_type === "FIXED") {
    final_price = price - coupon.discount_value;
    message = `Congratulations on your savings! You've saved ${coupon.discount_value} Rs on your order`;
  }

  // TODO REMOVE THIS CODE IT WILL BE DONE AFTER PAYMENT
  // await Coupon.updateOne(
  //   {
  //     coupon_code: coupon_code,
  //   },
  //   {
  //     $inc: {
  //       used_count: 1,
  //     },
  //     $push: {
  //       user_used: req.user._id,
  //     },
  //   }
  // );

  await Order.findByIdAndUpdate(order_id, {
    discount_price: final_price,
    coupon_code,
  });

  return success_response(res, message, { price, final_price });
});

const remove_coupon_code = asyncHandler(async (req, res) => {
  const { order_id } = req.body;

  await Order.findByIdAndUpdate(order_id, {
    coupon_code: null,
    discount_price: null,
  });

  return success_response(res, "Coupon code removed successfully");
});
module.exports = {
  create_coupon,
  update_coupon,
  delete_coupon,
  list_coupon,
  apply_coupon,
  remove_coupon_code,
};
