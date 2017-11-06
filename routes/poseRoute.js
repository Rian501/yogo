"use strict";

const { Router } = require("express");
const router = Router();

const {
  showAllPoses,
  showPoseDetail,
  posesByCat,
  searchPoses,
  posesByLev,
  myMovesMain
} = require("../controllers/poseCtrl.js");

router.get('/poses', showAllPoses);
router.get('/poses/category', posesByCat);
router.get('/poses/level', posesByLev);
router.get('/poses/:id', showPoseDetail);
router.get('/search', searchPoses);
router.get('/user/poses', myMovesMain);

module.exports = router;