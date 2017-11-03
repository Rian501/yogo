"use strict";
const passport = require("passport");

module.exports.showAllPoses = (req, res, next) => {
    const { Pose, Category, Level } = req.app.get("models");
    let cats=null;
    let levs=null;
    Level.findAll()
    .then((levels)=>{
        levs = levels;
    return Category.findAll()
    })
    .then( (categories)=> {
        cats = categories;
    return Pose.findAll()
    })
    .then( (poses) => {
        res.render('poses', {
            poses,
            cats,
            levs
        })
    })
    .catch( (err) => {
        next(err);
    });
};


// TODO: combine filters for both level AND type to allow for two pronged filtering
module.exports.posesByCat = (req, res, next) => {
const { Pose, Category, Level } = req.app.get("models");
let cats = null;
let levs = null;
Level.findAll()
  .then(levels => {
    levs = levels;
    return Category.findAll();
  })
  .then(categories => {
    cats = categories;
    return Pose.findAll({ where: { category_id: req.query.cat_id } });
  })
  .then(poses => {
    res.render("poses", { cats, poses, levs });
  })
  .catch(err => {
    next(err);
  });
};
module.exports.posesByLev = (req, res, next) => {
    console.log("posesbylev firing!");
    console.log('reqbody', req.query.lev_id);
    const { Pose, Category, Level } = req.app.get("models");
    let cats = null;
    let levs = null;
    Level.findAll()
    .then(levels => {
        levs = levels;
    return Category.findAll();
    })
    .then(categories => {
        cats = categories;
    return Pose.findAll({ where: { level_id: req.query.lev_id } });
    })
    .then(poses => {
        res.render("poses", { levs, poses, cats });
    })
    .catch(err => {
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
    if (!poses[0]) {
        req.flash('noSrchRes', `Nothing matches your request!`);
        res.redirect('/poses');
    } else {
        res.render('poses', {
            poses
        })
    }
    })
    .catch( (err) => {
        next(err)
    })
  } else {
    return res.redirect('/');
  };
};


