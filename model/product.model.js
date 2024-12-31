const { Schema, default: mongoose } = require("mongoose");

const productSchema = new Schema(
  {
    product_name: {
      type: String,
      require: true,
    },
    product_img: {
      type: [String],
    },
    product_price: {
      type: Number,
      require: true,
    },
    product_discount: {
      type: Number,
    },
    is_product_out_of_stock: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
