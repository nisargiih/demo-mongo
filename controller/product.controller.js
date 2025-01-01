const { default: mongoose } = require("mongoose");
const Product = require("../model/product.model");
const {
  success_message,
  success_response,
  custom_error_response,
} = require("../utils/common.response");
const { asyncHandler } = require("../utils/utils");
const fs = require("fs");

const create_product = asyncHandler(async (req, res) => {
  const { product_name, product_price, product_discount, category_id } =
    req.body;

  await Product.create({
    product_name,
    product_img: (req?.files || []).map((file) => file.path),
    product_price,
    product_discount,
    category_id,
  });

  return success_message(res, "Product created successfully");
});

const update_product = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const {
    product_name,
    product_price,
    product_discount,
    is_product_out_of_stock,
    product_image_delete = [],
    category_id,
  } = req.body;

  const product = await Product.findById(_id);

  const remove_product_img = product.product_img.filter(
    (img) => !product_image_delete.includes(img)
  );
  const product_img_payload = [
    ...(req?.files || []).map((file) => file.path),
    ...remove_product_img,
  ];

  if (product_img_payload.length > 4) {
    return custom_error_response(res, "Can't upload more than 4 product img");
  }

  await Product.updateOne(
    {
      _id,
    },
    {
      $set: {
        product_name,
        product_img: product_img_payload,
        product_price,
        product_discount,
        is_product_out_of_stock,
        category_id,
      },
    }
  );
  if (product_image_delete.length > 0) {
    product_image_delete.forEach(async (img) => {
      fs.unlink(img, (err) => {
        if (err) {
          return custom_error_response(
            res,
            err?.message ?? "Something went wrong",
            422
          );
        }
      });
    });
    return;
  }
  return success_message(res, "Product updated successfully");
});

const delete_product = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const find_product = await Product.findById(_id);

  if (find_product.product_img.length > 0) {
    find_product.product_img.forEach(async (img) => {
      fs.unlink(img, (err) => {
        if (err) {
          return custom_error_response(
            res,
            err?.message ?? "Something went wrong",
            422
          );
        }
      });
    });
  }
  await Product.findByIdAndDelete(_id);

  return success_message(res, "Product deleted successfully");
});

const all_product = asyncHandler(async (req, res) => {
  const { _id, limit = 10, page = 1, search, category_id } = req.body;
  const offset = (page - 1) * limit;
  let product = null;
  if (_id) {
    product = await Product.findById(_id);
  } else {
    const pipeline = [];

    if (category_id) {
      pipeline.push({
        $match: {
          category_id: mongoose.Types.ObjectId.createFromHexString(category_id),
        },
      });
    }

    if (search) {
      pipeline.push({
        $match: {
          product_name: {
            $regex: search,
          },
        },
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
    product = await Product.aggregate(pipeline);

    return success_response(res, "", { data: product });
  }
});

module.exports = {
  create_product,
  update_product,
  delete_product,
  all_product,
};
