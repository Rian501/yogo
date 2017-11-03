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
    const { Pose, Category, Level, Pose_Description } = req.app.get("models");
    Pose.findAll({
        include: [Category, Level, Pose_Description], 
        where: { id: req.params.id }
    }).then(pose => {
        let move = pose[0].dataValues
        // console.log("poses prolly need to dig in to datavalues", move);
        let level = move.Level;
        let category = move.Category;
        let moar = move.Pose_Description;
        res.render('poseDetail', {
            level,
            category, 
            move,
            moar
        })
    })
    .catch( (err) => {
        next(err);
    });
};


module.exports.searchPoses = (req, res, next) => {
  const { Pose } = req.app.get('models');
  if (req.user) {
    Pose.findAll({
     raw: true,
      where: {
        title: {
          $iLike: `%${req.query.title}%`
        }
      }
    })
    .then( (poses) => {     
      console.log('Pooossseee', poses);
      res.render('poses', {
          poses
        })
    })
    .catch( (err) => {
      next(err)
    })
  } else {
    return res.redirect('/');
  };
};


