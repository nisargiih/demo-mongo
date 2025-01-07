const { Schema, mongo, default: mongoose } = require("mongoose");

const orderSchema = new Schema(
  {
    products: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
          ref: "product",
          require: true,
        },
        quntity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
          require: true,
        },
      },
    ],
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    total_price: {
      type: Number,
      require: true,
    },
    delivery_charge: {
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
    payment_method: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD",
      require: true,
    },
    payment_recived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
