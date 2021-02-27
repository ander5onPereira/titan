"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/product-contollers");

router.get("/", controller.get);
router.get("/:slug", controller.getBySlug);
router.get("/admin/:id", controller.getId);
router.get("/tags/:tag", controller.getByTag);
router.post("/", controller.post);
router.put("/:id", controller.put);
router.delete("/", controller.delete);

module.exports = router;