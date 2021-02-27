"use strict";

const express = require("express");
const router = express.Router();
var path = __dirname + "/views/";

router.get("/", function(req, res) {
  res.sendFile(path + "/home/index.html");
});
router.get("/conf", function(req, res) {
  res.sendFile(path + "/config/config.html");
});
router.get("/statusServer", (req, res, next) => {
  res.status(200).send({
    title: "Node Status API",
    version: "0.0.2"
  });
});

module.exports = router;
