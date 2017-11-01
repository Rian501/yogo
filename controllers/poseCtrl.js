"use strict";
const passport = require("passport");

module.exports.showAllPoses = (req, res, next) => {
	const { Pose } = req.app.get("models");
    Pose.findAll()
    .then( (poses) => {
        console.log("poses prolly need to dig in to datavalues", poses);
        res.render('poses', {
            poses
        })
    })
};