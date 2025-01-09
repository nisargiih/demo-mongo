const { Schema, default: mongoose } = require("mongoose");

const subscriptionSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  send_promotional_mail: {
    type: Boolean,
    default: true,
  },
  send_new_product_update: {
    type: Boolean,
    default: true,
  },
  is_unsubscribe: {
    type: Boolean,
    default: false,
  },
});

const MailSubscription = mongoose.model(
  "mail_subscription",
  subscriptionSchema
);

module.exports = MailSubscription;
