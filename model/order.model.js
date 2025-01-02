const { Schema, mongo, default: mongoose } = require("mongoose");

const orderSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "product",
      require: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    quntity: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    delivery_satus: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PENDING",
      require: true,
    },
    order_date: {
      type: Date,
    },
    delivery_date: {
      type: Date,
    },
    expected_delivery_day: {
      type: Number,
      default: 7,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
