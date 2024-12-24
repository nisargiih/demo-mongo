const route = require("express").Router()

route.use(require("./auth.route"))

module.exports = route
