const {
  create_product,
  update_product,
  delete_product,
  all_product,
} = require("../controller/product.controller");
const { upload_product_img } = require("../middleware/multer.middleware");
const validate_response = require("../middleware/validation.middleware");
const { create_product_schema } = require("../validation/product.validation");

const route = require("express").Router();

route.post(
  "/create-proudct",
  upload_product_img,
  validate_response(create_product_schema),
  create_product
);
route.put("/update-product/:_id", update_product);
route.delete("/delete-product/:_id", delete_product);
route.get("/get-product/:_id?", all_product);

module.exports = route;
