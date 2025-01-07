const { checkout } = require("../controller/order.controller");
const { user_middleware } = require("../middleware/auth.middleware");

const route = require("express").Router();

route.post("/check-out", user_middleware, checkout);

module.exports = route;
