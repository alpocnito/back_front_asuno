const url = require("url");
const { emitter } = require("./variables.js");
const dataInst = require("../models/dataInst.js");
const paramInst = require("../models/paramInst.js");

module.exports.sendData = async (req, res) => {
  const DEV_EUI = url.parse(req.url, true).query.DEV_EUI;
  emitter.once("newData" + DEV_EUI, (message) => {
    // console.log("Emiiter newControlParameters:", message);
    res.json(message);
  });
};

module.exports.getControlParameters = async (req, res) => {
  const DEV_EUI = url.parse(req.url, true).query.DEV_EUI;
  emitter.once("newControlParameters" + DEV_EUI, (message) => {
    // console.log("Emiiter newControlParameters:", message);
    res.json(message);
  });
};

module.exports.getTimetable = async (req, res) => {
  const DEV_EUI = url.parse(req.url, true).query.DEV_EUI;
  emitter.once("newTimetable" + DEV_EUI, (message) => {
    // console.log("Emiiter newControlParameters:", message);
    res.json(message);
  });
};

module.exports.getLuxtable = async (req, res) => {
  const DEV_EUI = url.parse(req.url, true).query.DEV_EUI;
  emitter.once("newLuxtable" + DEV_EUI, (message) => {
    // console.log("Emiiter newControlParameters:", message);
    res.json(message);
  });
};

module.exports.getDataFromDB = async (req, res) => {
  const DEV_EUI = url.parse(req.url, true).query.DEV_EUI;
  const startDate = url.parse(req.url, true).query.startDate;
  const endDate = url.parse(req.url, true).query.endDate;

  dataInst
    .find({
      DEV_EUI: DEV_EUI,
      receivedAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
    .exec()
    .then((docs) => res.json(docs))
    .catch((err) => {
      console.log(err);
      res.json(error);
    });
};

module.exports.deleteDataFromDB = async (req, res) => {
  const DEV_EUI = url.parse(req.url, true).query.DEV_EUI;

  dataInst
    .remove({ DEV_EUI: DEV_EUI })
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.json(error);
    });
};
