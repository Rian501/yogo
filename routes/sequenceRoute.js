"use strict";

const { Router } = require("express");
const router = Router();

const {
  viewSeq,
  userSeqs,
  deleteCardFromSeq
} = require("../controllers/sequenceCtrl.js");

router.get("/sequence/:seq_id", viewSeq);
router.get("/sequence", userSeqs);
router.delete("/seqCard/:seq_id/:SUP_id", deleteCardFromSeq, viewSeq);


module.exports = router;