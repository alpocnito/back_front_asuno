const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  DEV_EUI: String,
  lamp_brightness: Number,
  temp_value: Number,
  light_value: Number,
  roll: Number,
  pitch: Number,
  lamp_voltage: Number,
  lamp_current: Number,
  active_power: Number,
  reactive_power: Number,
  time_modem: Number,
  time_reload: Number,
  rssi: Number,
  SNR: Number,
  bandwidth: Number,
  spreadingFactor: Number,
  codeRate: String,
  receivedAt: {
    type: Date,
    default: new Date(),
  },
});

// dataSchema.methods.saveData = function (data) {

//   dataInst

//   return mongoose.model("Animal").find({ type: this.type }, cb);
// };

const dataInst = mongoose.model("dataInst", dataSchema);
module.exports = dataInst;
