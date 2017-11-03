"use strict";
const passport = require("passport");

module.exports.showAllPoses = (req, res, next) => {
    const { Pose, Category } = req.app.get("models");
    let cats=null;
    Category.findAll()
    .then( (categories)=> {
        cats = categories;
        return Pose.findAll()
    })
    .then( (poses) => {
        res.render('poses', {
            poses,
            cats
        })
    })
    .catch( (err) => {
        next(err);
    });
};

module.exports.posesByCat = (req, res, next) => {
    console.log("posesbycat firing!");
    console.log('reqbody', req.query.cat_id);
    const { Pose, Category } = req.app.get("models");
    let cats=null;
    Category.findAll()
    .then( (categories)=> {
        cats = categories;
        return Pose.findAll({where: {category_id: req.query.cat_id}})
    })
    .then( (poses) => {
        // console.log("CATMATCHES", catMatches);
        res.render('poses', {
            cats,
            poses
        })
    })
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


