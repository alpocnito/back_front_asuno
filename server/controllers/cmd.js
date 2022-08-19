//const PostMessage = require("../models/postMessage.js";
const http = require("http");
const url = require("url");
const { bs64Tohex, hexTobs64, bs64Toarrbuf } = require("./helpFunctions.js");
const { CHIRP_API_KEY, CHIRP_URL, emitter } = require("./variables.js");
const dataInst = require("../models/dataInst.js");
const paramInst = require("../models/paramInst.js");

module.exports.sendCommand = async (req, res) => {
  res.status(200).json({
    message: req.params,
  });
  const DEV_EUI = url.parse(req.url, true).query.DEV_EUI;

  let buffer = hexTobs64(req.params.cmd);

  const data = JSON.stringify({
    deviceQueueItem: {
      confirmed: true,
      data: buffer,
      devEUI: DEV_EUI,
      fCnt: 0,
      fPort: 3,
    },
  });

  const options = {
    hostname: CHIRP_URL,
    port: 8080,
    method: "POST",
    path: "/api/devices/" + DEV_EUI + "/queue",
    headers: {
      "Content-Type": "application/json",
      Authorization: CHIRP_API_KEY,
      "Content-Type": "application/json",
    },
  };

  const requ = http.request(options, (resu) => {
    console.log(`statusCode: ${resu.statusCode}`);

    resu.on("data", (d) => {
      process.stdout.write(d);
    });
  });

  requ.on("error", (error) => {
    console.error(error);
  });

  requ.write(data);
  requ.end();

  // try {
  //   const postMessages = await PostMessage.find();
  //   console.log(postMessages);
  //   res.status(200).json(postMessages);
  // } catch (error) {
  //   res.status(404).json({ message: error.message });
  // }
};

module.exports.catchChirpStack = async (req, res) => {
  res.status(200);

  if (req.body.data == undefined) {
    return;
  }

  const DEV_EUI = bs64Toarrbuf(req.body.devEUI)
    .map((cur) => cur.toString(16).padStart(2, "0"))
    .join("");
  const buf = bs64Tohex(req.body.data);

  let offset = 0;
  let command_type = buf.getUint8(offset++);

  if (command_type == 0x01) {
    let lamp_control_mode = buf.getUint8(offset++, true);
    let interval_minutes = buf.getUint32(offset, true);
    offset += 4;
    let bh1730_gain = buf.getUint8(offset, true);

    console.log(`
        lamp_control_mode: ${lamp_control_mode},
        interval_minutes: ${interval_minutes},
        bh1730_gain: ${bh1730_gain}`);

    const param_inst = new paramInst({
      DEV_EUI,
      lamp_control_mode,
      interval_minutes,
      bh1730_gain,
      receivedAt: new Date(),
    });

    param_inst.save().catch((err) => {
      console.log(err);
    });

    // console.log("Emitted newControlParameters" + DEV_EUI);
    emitter.emit("newControlParameters" + DEV_EUI, [
      lamp_control_mode,
      interval_minutes,
      bh1730_gain,
    ]);
  }

  if (command_type == 0x02) {
    let timetable = [];
    for (let i = 0; i < 24; i++) {
      console.log(i, `:00: `, buf.getUint8(offset + i, true));
      timetable.push(buf.getUint8(offset + i, true));
    }

    // console.log("Emitted newTimetable" + DEV_EUI);
    emitter.emit("newTimetable" + DEV_EUI, timetable);
  }

  if (command_type == 0x03) {
    rssi = req.body.rxInfo[0].rssi;
    SNR = req.body.rxInfo[0].loRaSNR;
    bandwidth = req.body.txInfo.loRaModulationInfo.bandwidth;
    spreadingFactor = req.body.txInfo.loRaModulationInfo.spreadingFactor;
    codeRate = req.body.txInfo.loRaModulationInfo.codeRate;

    let lamp_brightness = buf.getUint8(offset++);
    let temp_value = buf.getUint8(offset++);
    let light_value = buf.getUint16(offset, true);
    offset += 2;
    let roll = buf.getUint8(offset++);
    let pitch = buf.getUint8(offset++);
    let lamp_voltage = buf.getUint32(offset, true);
    offset += 4;
    let lamp_current = buf.getUint32(offset, true);
    offset += 4;
    let active_power = buf.getUint32(offset, true);
    offset += 4;
    let reactive_power = buf.getUint32(offset, true);
    offset += 4;
    let time_modem = buf.getUint32(offset, true);
    offset += 4;
    let time_reload = buf.getUint32(offset, true);
    offset += 4;

    console.log(`
        lamp_brightness: ${lamp_brightness}, 
        temp_value: ${temp_value}, 
        light_value: ${light_value}, 
        roll: ${roll}, 
        pitch: ${pitch}, 
        lamp_voltage: ${lamp_voltage}, 
        lamp_current: ${lamp_current}, 
        actice_power: ${active_power}, 
        reactice_power: ${reactive_power},
        time_modem ${time_modem}, 
        time: ${time_reload},
        rssi: ${rssi.toFixed(2)},
        SNR: ${SNR.toFixed(2)},
        bandwidth: ${bandwidth},
        spreadingFactor: ${spreadingFactor},
        codeRate: ${codeRate}`);

    const data_inst = new dataInst({
      DEV_EUI,
      lamp_brightness,
      temp_value,
      light_value,
      roll,
      pitch,
      lamp_voltage,
      lamp_current,
      active_power,
      reactive_power,
      time_modem,
      time_reload,
      rssi,
      SNR,
      bandwidth,
      spreadingFactor,
      codeRate,
      receivedAt: new Date(),
    });

    data_inst.save().catch((err) => {
      console.log(err);
    });

    // console.log("Emitted newData" + DEV_EUI);
    emitter.emit("newData" + DEV_EUI, [
      lamp_brightness,
      temp_value,
      light_value,
      roll,
      pitch,
      lamp_voltage,
      lamp_current,
      active_power,
      reactive_power,
      time_modem,
      time_reload,
      rssi,
      SNR,
      bandwidth,
      spreadingFactor,
      codeRate,
    ]);
  }

  if (command_type == 0x04) {
    let luxtable = [];
    for (let i = 0; i < 11; i++) {
      console.log(i * 10, `% - `, buf.getUint16(offset + i * 2, true));
      luxtable.push(buf.getUint16(offset + i * 2, true));
    }

    // console.log("Emitted newLuxtable" + DEV_EUI);
    emitter.emit("newLuxtable" + DEV_EUI, luxtable);
  }

  console.log("--------------------------------------");
  // const body = req.body;

  // console.log(body);

  // const newPost = new PostMessage(body);

  // try {
  //   await newPost.save();

  //   res.status(201).json(newPost);
  // } catch (error) {
  //   res.status(409).json({ message: error.message });
  // }
};
