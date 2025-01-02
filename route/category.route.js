const {
  create_category,
  update_category,
  delete_category,
  all_category,
} = require("../controller/category.controller");
const { admin_middleware } = require("../middleware/auth.middleware");
const upload = require("../middleware/multer.middleware");
const validate_response = require("../middleware/validation.middleware");
const {
  create_category_schema,
  update_category_schema,
} = require("../validation/category.validation");

const route = require("express").Router();

route.get("/get-category", all_category);
route.post(
  "/create-category",
  admin_middleware,
  upload.upload_category_img,
  create_category,
  upload.revert_uploaded_file_if_error
);
route.put(
  "/update-category",
  admin_middleware,
  upload.upload_category_img,
  validate_response(create_category_schema),
  update_category,
  upload.revert_uploaded_file_if_error
);
route.put(
  "/update-category",
  admin_middleware,
  upload.upload_category_img,
  validate_response(update_category_schema),
  update_category,
  upload.revert_uploaded_file_if_error
);
route.delete("/delete-category/:_id", admin_middleware, delete_category);

module.exports = route;
