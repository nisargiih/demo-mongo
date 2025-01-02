const route = require("express").Router();

route.use(require("./auth.route"));
route.use(require("./category.route"));
route.use(require("./product.route"));
route.use(require("./cart.route"));
route.use(require("./user.route"));

module.exports = route;
