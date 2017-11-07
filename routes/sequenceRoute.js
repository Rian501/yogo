"use strict";

const { Router } = require("express");
const router = Router();

const {
  viewSeq,
  userSeqs,
  deleteCardFromSeq,
  addMoveToSeqEndFrUserPoses,
  sidesearchPoses,
  addNewMoveToSeqEnd,
  playSeq,
  updateSeqOrder
} = require("../controllers/sequenceCtrl.js");

router.get("/sequence/:seq_id", viewSeq);
router.post("/sequence/:seq_id/add/:UP_id", addMoveToSeqEndFrUserPoses);
router.post("/sequence/:seq_id/addnew/:pose_id", addNewMoveToSeqEnd);
router.get("/sequence", userSeqs);
router.delete("/seqCard/:seq_id/:SUP_id", deleteCardFromSeq, viewSeq);
router.get("/:seq_id/sidesearch", sidesearchPoses);
router.get("/sequence/play/:seq_id", playSeq);
router.put('/sequence/:seq_id', updateSeqOrder)


module.exports = router;