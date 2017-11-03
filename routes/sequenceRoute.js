"use strict";

const { Router } = require("express");
const router = Router();

const {
    editSeq,
    viewSeq,
    userSeqs
} = require("../controllers/sequenceCtrl.js");

router.get("/sequence/edit/:id", editSeq);
router.get("/sequence/:id", viewSeq);
router.get("/sequence", userSeqs);



module.exports = router;