const {
  create_address,
  update_address,
  delete_address,
  get_address,
} = require("../controller/address.controller");
const { user_middleware } = require("../middleware/auth.middleware");
const validate_response = require("../middleware/validation.middleware");
const {
  address_validation_schema,
} = require("../validation/address.validation");

const route = require("express").Router();

route.post(
  "/create-address",
  validate_response(address_validation_schema),
  user_middleware,
  create_address
);
route.put(
  "/update-address/:_id",
  validate_response(address_validation_schema),
  user_middleware,
  update_address
);
route.delete("/delete-address/:_id", user_middleware, delete_address);
route.get("/get-address", user_middleware, get_address);

module.exports = route;
