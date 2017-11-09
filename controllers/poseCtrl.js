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
    const { sequelize } = req.app.get("models");
    return sequelize
    .query(
        `SELECT * FROM "User_Poses", "Poses" WHERE "User_Poses".pose_id="Poses".id`
    )
};


module.exports.myMovesMain = (req, res, next) =>{
    if (req.user) {
       getMyMoves(req, next).then(results => {
         req.session.myMoves = results[0];
         //now myMoves is an array attached to the reqSession!! HOLY SHIT!!
         let myMoves = req.session.myMoves;
         res.render('editMyMoves', {
             myMoves,
            })
        });
    }
};
    
module.exports.deleteUserPose = (req, res, next) => {
  const { User_Poses } = req.app.get("models");
  User_Poses.destroy({where: {up_pk_id: req.params.id}})
  .then( (results) => {
      console.log("results of delete", results);
      next();
  })
  .catch( (err) => {
      next(err);
  })
};

module.exports.displayEditUserPose = (req, res, next) => {
  console.log('req.parasms.id', req.params.id);
  const { User_Poses, Pose } = req.app.get('models');
  let poseDeets=null;
  let poseBasics=null;
  let UP_id=req.params.id;
    User_Poses.findAll({
        where: {up_pk_id: UP_id}
    })
    .then((onePose)=> {
        console.log("onepose", onePose[0].dataValues);
        poseDeets = onePose[0].dataValues;
        return Pose.findById(poseDeets.pose_id)
    })
    .then( (posesBasics)=>{
        console.log("poseBasics", posesBasics.dataValues);
        poseBasics = posesBasics.dataValues;
        poseBasics = posesBasics.dataValues;
        res.render('editOnePose', {
            poseBasics,
            poseDeets,
            UP_id
        })
    })
};

// TODO: combine filters for both level AND type to allow for two pronged filtering
module.exports.posesByCatAndLev = (req, res, next) => {
    const { Pose, Category, Level } = req.app.get("models");
    let cats = null;
    let poses = null;
    let levs = null;
    let cat_name = null;
    let lev_name = null;
    Level.findAll()
    .then(levels => {
        levs = levels;
        return Category.findAll();
    })
    .then(categories => {
        cats = categories;
        if (req.query.cat_id && req.query.lev_id) {
            return Pose.findAll({ where: { category_id: req.query.cat_id, level_id: req.query.lev_id } })
            .then( (foundposes) =>{
                poses=foundposes;
                return Category.findById(req.query.cat_id)
            })
            .then( (specCat)=>{
                cat_name=specCat.name;
                return Level.findById(req.query.lev_id);
            })
            .then( (specLev)=>{
                lev_name=specLev.name;
                res.render('poses', {
                    poses, levs, cats, cat_name, lev_name
                })
            })
        } else if (req.query.lev_id) {
            return Pose.findAll({
              where: {
                level_id: req.query.lev_id
              }
            })
            .then( (foundposes) =>{
                poses=foundposes;
                return Level.findById(req.query.lev_id);
            })
            .then( (specLev)=>{
                lev_name=specLev.name;
                res.render('poses', {
                    poses, levs, cats, lev_name
                })
            }) 
        } else if (req.query.cat_id) {
            return Pose.findAll({
                where: {
                    category_id: req.query.cat_id
                }
            }).then( (foundposes) => {
                poses=foundposes;
                return Category.findById(req.query.cat_id)
            })
            .then( (specCat)=>{
                cat_name=specCat.name;
                res.render('poses', {
                    poses, levs, cats, cat_name
                })
            })
        }
    }) 
};

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
                meta_title: {
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

module.exports.updateUserPose = (req,res,next) => {
  const { sequelize } = req.app.get('models');
  let direx = req.body.up_special_directions;
  let breath = req.body.up_breath;
  let UP_id = parseInt(req.params.id);
  sequelize.query(`UPDATE "User_Poses" SET "up_special_directions" = '${direx}', "up_breath" = '${breath}' WHERE "up_pk_id" = ${UP_id}`)
  .then( (results) => {
    console.log(results);
    next();
  })
  .catch( (err)=>{
    next(err);
  })
};