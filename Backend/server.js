const express = require("express");
const app = express();
const cors = require("cors");
const songs = require("./api/songs.route");
const morgan = require("morgan");

//use the middlewares
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

//use the api router
app.use("/api/v1/songs", songs);

//dummy api
app.use("/api/heatbeat", (req, res) => {
  res.status(200);
});

app.use("*", (req, res) => {
  res.status(404).json({
    status: "Failed",
    message: `cannot find any route in this server for ${req.originalUrls}`,
  });
});

module.exports = app;
