const express = require("express");
const { sendCommand, catchChirpStack } = require("../controllers/cmd.js");

const router = express.Router();

router.post("");
router.get("/:cmd", sendCommand);
router.post("*", catchChirpStack);

module.exports = router;
