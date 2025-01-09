const MailSubscription = require("../model/mail.subscription.model");
const { success_message } = require("../utils/common.response");
const { asyncHandler } = require("../utils/utils");

const create_mail_subscription = asyncHandler(async (req, res) => {
  const { email } = req.body;

  await MailSubscription.create({
    email,
  });

  return success_message(res, "subscribed successfully");
});

const unsubscribe_mail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  await MailSubscription.findOneAndUpdate(
    {
      email,
    },
    {
      is_unsubscribe: true,
    }
  );

  return success_message(res, "Unsubscribed successfully");
});
module.exports = { create_mail_subscription, unsubscribe_mail };
