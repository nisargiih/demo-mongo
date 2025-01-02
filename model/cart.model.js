const { Schema, default: mongoose } = require("mongoose");

const cartSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "product",
      require: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;
