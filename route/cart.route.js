const { add_quantity } = require("../controller/cart.controller");
const { user_middleware } = require("../middleware/auth.middleware");
const validate_response = require("../middleware/validation.middleware");
const {
  add_or_remove_quantity_schema,
} = require("../validation/cart.validation");

const route = require("express").Router();

route.post(
  "/add-or-remove-quantity",
  user_middleware,
  validate_response(add_or_remove_quantity_schema),
  add_quantity
);

module.exports = route;
