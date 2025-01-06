const { get_payment } = require("../controller/order.controller");
const { user_middleware } = require("../middleware/auth.middleware");

const route = require("express").Router();

route.post("/get-payment", user_middleware, get_payment);

module.exports = route;
