const Cart = require("../model/cart.model");
const {
  success_message,
  success_response,
} = require("../utils/common.response");
const { asyncHandler } = require("../utils/utils");

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const get_payment = asyncHandler(async (req, res) => {
  const pipeline = [
    {
      $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
    {
      $addFields: {
        total: {
          $multiply: ["$quantity", "$product.product_price"],
        },
      },
    },
    {
      $group: {
        _id: null,
        items: { $push: "$$ROOT" },
        total_price: { $sum: "$total" },
      },
    },
    {
      $project: {
        items: {
          _id: 1,
          quantity: 1,
          product: {
            product_price: 1,
            product_name: 1,
            product_img: 1,
          },
          total: 1,
        },
        total_price: 1,
      },
    },
  ];

  const cart_details = await Cart.aggregate(pipeline);

  return success_response(res, "Product purchase successfully", {
    data: cart_details[0].items,
    total_price: cart_details[0].total_price,
  });
});

module.exports = { get_payment };
