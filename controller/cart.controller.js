const Cart = require("../model/cart.model");
const { success_message } = require("../utils/common.response");
const { asyncHandler } = require("../utils/utils");

const add_quantity = asyncHandler(async (req, res) => {
  const { product_id, is_decrease_quntity = false } = req.body;

  const quantity_value = is_decrease_quntity ? -1 : 1;

  const cart = await Cart.findOneAndUpdate(
    { product_id, user_id: req?.user?._id },
    {
      $inc: { quantity: quantity_value },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  if (cart?.quantity <= 0) {
    await Cart.findByIdAndDelete(cart._id);
  }

  let message = null;

  if (cart.quantity <= 0) {
    message = "Cart is empty";
  } else if (cart.quantity > 1 || (cart.quantity === 1 && is_decrease_quntity)) {
    message = "Quantity change";
  } else {
    message = "Product added to cart";
  }

  return success_message(res, message);
});

module.exports = { add_quantity };
