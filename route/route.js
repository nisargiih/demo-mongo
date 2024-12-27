const route = require("express").Router()

route.use(require("./auth.route"))
route.use(require("./category.route"))

module.exports = route
