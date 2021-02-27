"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/consumo-controllers");

router.get("/", controller.get);
router.delete("/", controller.delete);

module.exports = router;
