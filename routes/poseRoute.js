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
  deleteUserPose,
  displayEditUserPose,
  updateUserPose,
  posesByCatAndLev
} = require("../controllers/poseCtrl.js");

router.get('/poses', showAllPoses);
router.get('/poses/category', posesByCat);
router.get('/poses/level', posesByLev);
router.get('/poses/catlev', posesByCatAndLev);
router.get('/poses/:id', showPoseDetail);
router.get('/search', searchPoses);
router.get('/user/poses', myMovesMain);
router.get("/user/pose/:id", displayEditUserPose);
router.delete("/user/pose/:id", deleteUserPose, myMovesMain);
router.put('/user/pose/:id', updateUserPose, myMovesMain);

module.exports = router;