"use strict";

const { Router } = require("express");
const router = Router();

const {
  showAllPoses,
  showPoseDetail,
  posesByCat,
  searchPoses,
  posesByLev,
  myMovesMain,
  deleteUserPose
} = require("../controllers/poseCtrl.js");

router.get('/poses', showAllPoses);
router.get('/poses/category', posesByCat);
router.get('/poses/level', posesByLev);
router.get('/poses/:id', showPoseDetail);
router.get('/search', searchPoses);
router.get('/user/poses', myMovesMain);
router.delete("/user/pose/:id", deleteUserPose, myMovesMain);
module.exports = router;