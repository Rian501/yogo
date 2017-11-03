"use strict";

const { Router } = require("express");
const router = Router();

const {
  showAllPoses,
  showPoseDetail,
  searchPoses
} = require("../controllers/poseCtrl.js");


router.get('/poses', showAllPoses);
router.get('/poses/:id', showPoseDetail);
router.get('/search', searchPoses);

// const {getDescrips} = require("../kitchenSink");
// router.get('/stockup', getDescrips);

module.exports = router;