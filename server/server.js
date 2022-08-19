const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cmdRoutes = require("./routes/cmd.js");
const getRoutes = require("./routes/get.js");
const morgan = require("morgan");
const path = require("path");
const dataInst = require("./models/dataInst.js");
const mongoose = require("mongoose");

const { fileURLToPath } = require("url");
const app = express();

app.use(bodyParser.json({ limit: "32mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "32mb", extended: "true" }));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/cmds", cmdRoutes);

// LongPulling
app.use("/get", getRoutes);

// // Frontend
// app.use(express.static(path.join(__dirname, "build")));

// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

//////////////////////////////////// ERRORS /////////////////////////////////////////
app.use("*", (req, res, next) => {
  console.log("Unknwon path", req.url);

  const error = new Error("Not found");
  error.status(404);

  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      error: error,
    },
  });
});
//////////////////////////////////////////////////////////////////////////////////////

mongoose.connect("mongodb://localhost/asuno_data", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 5001;
// app.listen(PORT);

mongoose.connection
  .once("open", () => {
    console.log("Mongodb are connected");
    app.listen(PORT, () => {
      console.log("server running");
    });
  })
  .on("error", (error) => {
    console.warn(error);
  });
