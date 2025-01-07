const {
  create_coupon,
  update_coupon,
  delete_coupon,
  list_coupon,
  apply_coupon,
} = require("../controller/coupon.controller");
const validate_response = require("../middleware/validation.middleware");
const { create_coupon_schema } = require("../validation/coupon.validation");

const route = require("express").Router();

route.post(
  "/create-coupon",
  validate_response(create_coupon_schema),
  create_coupon
);
route.put(
  "/update-coupon/:_id",
  validate_response(create_coupon_schema),
  update_coupon
);
route.delete("/delete-coupon/:_id", delete_coupon);
route.get("/all-coupon", list_coupon);
route.post("/apply-coupon", apply_coupon);

module.exports = route;
