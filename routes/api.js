var express = require("express");
var generalRouter = require("./general");

var app = express();

app.use("/general/", generalRouter);

module.exports = app;