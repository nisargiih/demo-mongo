const {
  create_mail_subscription,
  unsubscribe_mail,
} = require("../controller/mail.subscription.controller");
const validate_response = require("../middleware/validation.middleware");
const {
  email_validation_schema,
} = require("../validation/mail.subscription.validation");

const route = require("express").Router();

route.post(
  "/subscribed-mail",
  validate_response(email_validation_schema),
  create_mail_subscription
);

route.post(
  "/unsubscribed-mail",
  validate_response(email_validation_schema),
  unsubscribe_mail
);

module.exports = route;
