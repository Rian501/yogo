"use strict";

const { Router } = require("express");
const router = Router();

const {
  viewSeq,
  userSeqs,
  deleteCardFromSeq,
  addMoveToSeqEndFrUserPoses
} = require("../controllers/sequenceCtrl.js");

router.get("/sequence/:seq_id", viewSeq);
router.post("/sequence/:seq_id/add/:UP_id", addMoveToSeqEndFrUserPoses);
router.get("/sequence", userSeqs);
router.delete("/seqCard/:seq_id/:SUP_id", deleteCardFromSeq, viewSeq);


module.exports = router;