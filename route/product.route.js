const {
  create_product,
  update_product,
  delete_product,
  all_product,
} = require("../controller/product.controller");
const { admin_middleware } = require("../middleware/auth.middleware");
const {
  upload_product_img,
  revert_uploaded_product_img_if_error,
} = require("../middleware/multer.middleware");
const validate_response = require("../middleware/validation.middleware");
const {
  create_product_schema,
  update_product_schema,
} = require("../validation/product.validation");

const route = require("express").Router();

route.post(
  "/create-proudct",
  admin_middleware,
  upload_product_img,
  validate_response(create_product_schema),
  create_product,
  revert_uploaded_product_img_if_error
);
route.put(
  "/update-product/:_id",
  admin_middleware,
  upload_product_img,
  validate_response(update_product_schema),
  update_product,
  revert_uploaded_product_img_if_error
);
route.delete("/delete-product/:_id", admin_middleware,delete_product);
route.get("/get-product/:_id?", all_product);

module.exports = route;
