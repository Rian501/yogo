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
  updateSeqOrder,
  sidesearchCategories,
  sidesearchLevels,
  addNewSeq,
  deleteSequence
} = require("../controllers/sequenceCtrl.js");



//test and then remove the searches for levels and categories in poses also

router.get("/sequence/:seq_id", viewSeq);
router.post("/sequence/new", addNewSeq);
router.post("/sequence/:seq_id/add/:UP_id", addMoveToSeqEndFrUserPoses);
router.post("/sequence/:seq_id/addnew/:pose_id", addNewMoveToSeqEnd);
router.get("/sequence", userSeqs);
router.delete("/seqCard/:seq_id/:SUP_id", deleteCardFromSeq, viewSeq);
router.get("/:seq_id/sidesearch", sidesearchPoses);
router.get("/:seq_id/sidecategory/:cat_id", sidesearchCategories);
router.get("/:seq_id/sidelevel/:lev_id", sidesearchLevels);
router.get("/sequence/play/:seq_id", playSeq);
router.put('/sequence/:seq_id', updateSeqOrder)
router.delete('/sequence/:id', deleteSequence, userSeqs);

module.exports = router;