"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/consumo-controllers-esp");

router.get("/", controller.get);
router.post("/", controller.post);
router.get("/:nome", controller.getNome);
router.get("/soma/sun", controller.getSomaConsumo);
router.post("/consumo", controller.postConsumo);
router.delete("/", controller.delete);

module.exports = router;
