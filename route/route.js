const route = require("express").Router();

route.use(require("./auth.route"));
route.use(require("./category.route"));
route.use(require("./product.route"));

module.exports = route;
