const Cart = require("../model/cart.model");
const Order = require("../model/order.model");
const { success_response } = require("../utils/common.response");
const { asyncHandler } = require("../utils/utils");

const checkout = asyncHandler(async (req, res) => {
  const { payment_method } = req.body;
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
      $addFields: {
        delivery_charge: {
          $cond: {
            if: { $gte: ["$total_price", 350] },
            then: 0,
            else: 50,
          },
        },
      },
    },
    {
      $addFields: {
        final_price: { $add: ["$total_price", "$delivery_charge"] },
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
            _id: 1,
          },
          total: 1,
        },
        total_price: 1,
        delivery_charge: 1,
        final_price: 1,
      },
    },
  ];

  const cart_details = await Cart.aggregate(pipeline);
  const data = {
    data: cart_details[0].items,
    total_price: cart_details[0].total_price,
    delivery_charge: cart_details[0].delivery_charge,
    final_price: cart_details[0].final_price,
  };

  // TODO PAYMENT INTIGRATION
  let products = [];

  if (cart_details[0].items) {
    products = cart_details[0].items.map((product) => ({
      product_id: product.product._id,
      quantity: product.quantity,
      price: product.product.product_price,
    }));
  }

  const order_date = new Date();

  await Order.create({
    products,
    user_id: req?.user?._id,
    delivery_charge: cart_details[0].delivery_charge,
    order_date,
    total_price: cart_details[0].final_price,
    payment_method: "ONLINE",
  });

  const ids = cart_details[0].items.map((product) => product._id);

  await Cart.deleteMany({
    _id: { $in: ids },
  });
  return success_response(res, "Product purchase successfully", data);
});

module.exports = { checkout };
