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

// include: [Category, Level],
  (module.exports.showPoseDetail = (req, res, next) => {
    const { Pose, Category, Level } = req.app.get("models");
    Pose.findAll({
      include: [Category, Level], 
      where: { id: req.params.id }
    }).then(pose => {
      console.log("pose deets", pose);
    });
  });