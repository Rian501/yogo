"use strict";

const { Router } = require("express");
const router = Router();

const {
  editSeq,
  viewSeq,
  userSeqs,
  deleteCardFromSeq
} = require("../controllers/sequenceCtrl.js");

router.get("/sequence/edit/:id", editSeq);
router.get("/sequence/:id", viewSeq);
router.get("/sequence", userSeqs);
router.delete("/seqCard/:seq_id/:pose_id", deleteCardFromSeq);


module.exports = router;