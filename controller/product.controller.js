const Product = require("../model/product.model");
const {
  success_message,
  success_response,
} = require("../utils/common.response");
const { asyncHandler } = require("../utils/utils");

const create_product = asyncHandler(async (req, res) => {
  const { product_name, product_price, product_discount } =
    req.body;

  await Product.create({
    product_name,
    product_img : (req?.files || []).map((file) => file.path),
    product_price,
    product_discount,
  });

  return success_message(res, "Product created successfully");
});

const update_product = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const {
    product_name,
    product_img,
    product_price,
    product_discount,
    is_product_out_of_stock,
  } = req.body;

  await Product.updateOne(
    {
      _id,
    },
    {
      $set: {
        product_name,
        product_img,
        product_price,
        product_discount,
        is_product_out_of_stock,
      },
    }
  );

  return success_message(res, "Product updated successfully");
});

const delete_product = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  await Product.findByIdAndDelete(_id);

  return success_message(res, "Product deleted successfully");
});

const all_product = asyncHandler(async (req, res) => {
  const { _id, limit = 10, page = 1, search } = req.body;
  const offset = (page - 1) * limit;
  let product = null;
  if (_id) {
    product = await Product.findById(_id);
  } else {
    const payload = {};
    if (search) {
      page.product_name = {
        $regex: search,
      };
    }

    product = await Product.find(payload).limit(limit).skip(offset);

    return success_response(res, "", { data: product });
  }
});
module.exports = {
  create_product,
  update_product,
  delete_product,
  all_product,
};
