"use strict";

const { Router } = require("express");
const router = Router();

const {
  viewSeq,
  userSeqs,
  deleteCardFromSeq,
  addMoveToSeqEndFrUserPoses,
  sidesearchPoses
} = require("../controllers/sequenceCtrl.js");

router.get("/sequence/:seq_id", viewSeq);
router.post("/sequence/:seq_id/add/:UP_id", addMoveToSeqEndFrUserPoses);
router.get("/sequence", userSeqs);
router.delete("/seqCard/:seq_id/:SUP_id", deleteCardFromSeq, viewSeq);
router.get("/:seq_id/sidesearch", sidesearchPoses);


module.exports = router;