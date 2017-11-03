"use strict";

const { Router } = require("express");
const router = Router();

const {
  showAllPoses,
  showPoseDetail,
  posesByCat,
  searchPoses
} = require("../controllers/poseCtrl.js");


router.get('/poses', showAllPoses);
router.get('/poses/category', posesByCat);
router.get('/poses/:id', showPoseDetail);
router.get('/search', searchPoses);

// const {getDescrips} = require("../kitchenSink");
// router.get('/stockup', getDescrips);

module.exports = router;