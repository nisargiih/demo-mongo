const {
  checkout,
  place_order,
  delete_pre_order,
  update_order,
  all_order_list,
  cancel_order,
} = require("../controller/order.controller");
const {
  user_middleware,
  admin_middleware,
} = require("../middleware/auth.middleware");

const route = require("express").Router();

route.post("/check-out", user_middleware, checkout);
route.post("/place-order", user_middleware, place_order);
route.delete("/delete-pre-order", user_middleware, delete_pre_order);
route.put("/update-order", admin_middleware, update_order);
route.get("/all-order-list", admin_middleware, all_order_list);
route.post("/cancel-order", user_middleware, cancel_order);

module.exports = route;
