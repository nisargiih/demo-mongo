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
      enum: [
        "PENDING",
        "ACCEPTED",
        "SHIPPED",
        "DELIVERED",
        "CANCEL_REQUEST",
        "CANCELLED",
      ],
      default: "PENDING",
      require: true,
    },
    order_date: {
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
    payment_received: {
      type: Boolean,
      default: false,
    },
    is_pre_order: {
      type: Boolean,
      default: true,
    },
    discount_price: {
      type: Number,
    },
    coupon_code: {
      type: Schema.Types.ObjectId,
      ref: "coupon",
    },
    delivery_address: {
      type: Schema.Types.ObjectId,
      ref: "address",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
