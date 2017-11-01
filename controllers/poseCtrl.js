"use strict";
const passport = require("passport");

module.exports.showAllPoses = (req, res, next) => {
	const { Pose } = req.app.get("models");
    Pose.findAll()
    .then( (poses) => {
        res.render('poses', {
            poses
        })
    })
    .catch( (err) => {
        next(err);
    });
};

module.exports.showPoseDetail = (req, res, next) => {
    const { Pose, Category, Level } = req.app.get("models");
    Pose.findAll({
        include: [Category, Level], 
        where: { id: req.params.id }
    }).then(pose => {
        let move = pose[0].dataValues
        console.log("poses prolly need to dig in to datavalues", move);
        let level = move.Level;
        let category = move.Category;
        res.render('poseDetail', {
            level,
            category, 
            move
        })
    })
    .catch( (err) => {
        next(err);
    });
};