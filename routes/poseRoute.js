"use strict";

const { Router } = require("express");
const router = Router();

const {
  showAllPoses,
  showPoseDetail
} = require("../controllers/poseCtrl.js");

const {getDescrips} = require("../kitchenSink");

router.get('/poses', showAllPoses);
router.get('/poses/:id', showPoseDetail);

router.get('/stockup', getDescrips);

module.exports = router;