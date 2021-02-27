"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/estados-controllers");

router.get("/", controller.get);
router.get("/status", controller.getStatus);
router.get("/:id", controller.getUp);
router.get("/busca/:id", controller.getId);
router.put("/:id", controller.postNome);
//router.get("/consumo/:id/:consumo", controller.getConsumo);
/*router.get("/:slug", controller.getBySlug);
router.get("/admin/:id", controller.getId);
router.get("/tags/:tag", controller.getByTag);
*/
//router.put("/:id", controller.put);
router.post("/", controller.post);
router.post("/consumo", controller.getConsumo);
router.delete("/", controller.delete);
/*
router.put("/:id", controller.put);
router.delete("/", controller.delete);*/

module.exports = router;
