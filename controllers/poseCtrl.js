"use strict";
const passport = require("passport");
let myMoves = null;

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


//use block content, append, prepend, something to make "mymoves" available to my poses, as well as my sequencepages  https://pugjs.org/language/inheritance.html
const getMyMoves = (req, next) => {
  if (req.user) {
    const { sequelize } = req.app.get("models");
    sequelize
      .query(
        `SELECT * FROM "User_Poses", "Poses" WHERE "User_Poses".pose_id="Poses".id`
      )
      .then(results => {
        console.log("MY MOVES COMPLEtE", results[0]);
        myMoves = results[0];
        // return myMoves;
    })
    .catch(err => {
        next(err);
    });
}
};


module.exports.myMovesMain = (req, res, next) =>{
    getMyMoves(req, next)
    .then((results) =>{
        console.log("MY MOVES ??", myMoves);
        console.log("resultS ??", results);
        res.render('editMyMoves', {
            myMoves,
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
        return Pose.findAll({
            raw: true,
            where: {
                title: {
                    $iLike: `%${req.query.title}%`
                }
            }
        })
    })
    .then( (poses) => {
        if (!poses[0]) {
            req.flash('noSrchRes', `Nothing matches your request!`);
            res.redirect('/poses');
        } else {
            res.render('poses', {
                poses,
                cats,
                levs
            })
        }
    })
    .catch( (err) => {
        next(err)
    })
};


