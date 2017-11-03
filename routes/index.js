"use strict";

const { Router } = require("express");
const router = Router();

router.get("/", (req, res, next) => {
  res.render("index");
});

router.use(require("./authRoute"));
router.use(require("./poseRoute"));
router.use(require("./sequenceRoute"));

module.exports = router;
