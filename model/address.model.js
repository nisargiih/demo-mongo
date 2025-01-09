const { Schema, default: mongoose } = require("mongoose");

const addressSchema = new Schema({
  use_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  address: {
    type: String,
    require: true,
  },
  pincode: {
    type: Number,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
});

const Address = mongoose.model("address", addressSchema);

module.exports = Address;
