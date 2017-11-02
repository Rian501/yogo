"use strict";

const { Router } = require("express");
const router = Router();

const {
  showAllPoses,
  showPoseDetail
} = require("../controllers/poseCtrl.js");


router.get('/poses', showAllPoses);
router.get('/poses/:id', showPoseDetail);

module.exports = router;