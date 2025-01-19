const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
  months: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  gym: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "gym",
    required: true,
  },
});

const model = mongoose.model("membership", memberSchema);
module.exports=model;
