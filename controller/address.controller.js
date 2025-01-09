const Address = require("../model/address.model");
const {
  success_message,
  success_response,
} = require("../utils/common.response");
const { asyncHandler } = require("../utils/utils");

const create_address = asyncHandler(async (req, res) => {
  const { address, pincode, state, city } = req.body;

  await Address.create({
    address,
    use_id: req.user._id,
    pincode,
    state,
    city,
  });
  return success_message(res, "Address added successfully");
});

const update_address = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const { address, pincode, state, city } = req.body;

  await Address.findOneAndUpdate(
    { _id, use_id: req.user._id },
    {
      address,
      pincode,
      state,
      city,
    }
  );

  return success_message(res, "Address updated successfully");
});

const delete_address = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  await Address.findOneAndDelete({
    _id,
    use_id: req.user._id,
  });

  return success_message(res, "Address deleted successfully");
});

const get_address = asyncHandler(async (req, res) => {
  const { limit = 10, page = 1 } = req.body;
  const offset = limit * (page - 1);
  const address = await Address.find({ use_id: req.user._id })
    .limit(limit)
    .skip(offset);

  return success_response(res, "", { data: address });
});

module.exports = {
  create_address,
  update_address,
  delete_address,
  get_address,
};
