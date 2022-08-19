const mongoose = require("mongoose");

const paramSchema = mongoose.Schema({
  DEV_EUI: String,
  lamp_control_mode: Number,
  interval_minutes: Number,
  bh1730_gain: Number,
  receivedAt: {
    type: Date,
    default: new Date(),
  },
});

const paramInst = mongoose.model("paramInst", paramSchema);
module.exports = paramInst;
