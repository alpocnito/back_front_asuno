const express = require("express");
const {
  sendData,
  getControlParameters,
  getTimetable,
  getLuxtable,
  getDataFromDB,
  deleteDataFromDB,
} = require("../controllers/get.js");

const { sendCommand } = require("../controllers/cmd.js");

const router = express.Router();

router.get("/01", getControlParameters);
router.get("/02", getTimetable);
router.get("/03", sendData);
router.get("/04", getLuxtable);
router.get("/50", getDataFromDB);
router.get("/51", deleteDataFromDB);

router.get("/*", sendCommand);

module.exports = router;
