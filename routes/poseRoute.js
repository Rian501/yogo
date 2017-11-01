"use strict";

const { Router } = require("express");
const router = Router();

const {
  showAllPoses
} = require("../controllers/poseCtrl.js");


router.get('/poses', showAllPoses);

module.exports = router;