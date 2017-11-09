"use strict";
const passport = require("passport");
let myMoves=null;

module.exports.deleteCardFromSeq = (req, res, next) => {
  const { Sequence, SequenceUserPoses, User_Pose } = req.app.get('models');
  console.log("SUPid", req.params.SUP_id);
  console.log("seq id", req.params.seq_id);
  let backtoSeq = parseInt(req.params.seq_id);
  SequenceUserPoses.destroy({where: {seqUsPos_id:req.params.SUP_id}})
  .then( (result) => {
    next();
  })
  .catch( (err) => {
    next(err);
  })
}

const getMyMoves = (req, next) => {
  const { sequelize } = req.app.get("models");
  return sequelize.query(
    `SELECT * FROM "User_Poses", "Poses" WHERE "User_Poses".pose_id="Poses".id AND "User_Poses".user_id=${req.user.id}`
  );
};

module.exports.updateSeqOrder = (req, res, next) => {
  const { sequelize } = req.app.get('models');
  
  let seq_id = req.params.seq_id
  let SeqUsArr =  req.body['SeqUsPosesInOrder[]']
  for (let i=0; i<SeqUsArr.length; i++) {
    let newSpot = i+1;
    sequelize.query(`UPDATE "SequenceUserPoses" 
    SET position_order = ${newSpot}
    WHERE "seqUsPos_id" = ${SeqUsArr[i]}
    AND sequence_id = ${seq_id}`)
    .then((results) =>{
      console.log("what comes back?", results);
    })
  }
};

module.exports.viewSeq = (req, res, next) => {
  if (req.user) {
    const { Pose, Category, Level, sequelize } = req.app.get("models");
    
    let cats = null;
    let levs = null;
    let moves=null;
    getMyMoves(req, next)
    .then(results => {
      // req.session.myMoves = results[0];
      // myMoves = req.session.myMoves;
      myMoves = results[0];
      return sequelize
      .query(`
      SELECT * FROM "SequenceUserPoses", "User_Poses", "Poses" WHERE "SequenceUserPoses"."sequence_id"=${req.params.seq_id} AND "SequenceUserPoses".user_pose_id="User_Poses"."up_pk_id" AND "User_Poses".pose_id="Poses".id ORDER BY "SequenceUserPoses".position_order`)
    })
    .then(results => {
      moves = results[0]
      // console.log("moves for digging", moves);
      //might need to add card timing as a number property for later manipulation rather than if-elsing it on the pugdom
      return Level.findAll()
    })
    .then(levels => {
    levs = levels;
    return Category.findAll();
  })
  .then((categories) =>{
    cats=categories;
    res.render('viewSeq', {
      moves,
      cats,
      levs,
      myMoves,
      seq_id: req.params.seq_id
    })
  })
    .catch(err => {
      next(err);
    });
  } else { res.redirect('/')}
}

module.exports.userSeqs = (req, res, next) => {
  if (req.user) {
    let myMoves=null;
    const { sequelize, Sequence } = req.app.get('models');
    getMyMoves(req, next)
    .then(results => {
      myMoves = results[0];
      return Sequence.findAll({
        where: {user_id: req.user.id}
      })
    })
    .then( (seqs) => {
      res.render('userSequences', {
        seqs,
        myMoves
      })
    })
  } else {
    return res.redirect('/');
  }
};

module.exports.addNewMoveToSeqEnd = (req, res, next)=>{
  let currentSeqId=parseInt(req.params.seq_id);
  if (req.user) {
    const { sequelize, SequenceUserPoses, User_Poses } = req.app.get('models');
    let currentSeqId=parseInt(req.params.seq_id);
    let addPosOrder = null;
    let max = null;
    let newUserMove = null;
    User_Poses.create({
      user_id: req.user.id,
      pose_id: req.params.pose_id
    })
    .then((results)=>{
      newUserMove = results.dataValues.up_pk_id;
      return sequelize.query(`SELECT * FROM "SequenceUserPoses", "User_Poses", "Poses" WHERE "SequenceUserPoses"."sequence_id"=${req.params.seq_id} AND "SequenceUserPoses".user_pose_id="User_Poses"."up_pk_id" AND "User_Poses".pose_id="Poses".id ORDER BY "SequenceUserPoses".position_order`)
    })
    .then( (results) => {
      if (results[0].length === 0) {
       max = 0;
      } else {
      let orderP = results[0].map(function(each) {
        return each.position_order;
      });
      let max = orderP.reduce(function(a, b) {
        return Math.max(a, b);
      });
    }
      addPosOrder = max + 1;
        return SequenceUserPoses.create({
          user_pose_id: newUserMove,
          position_order: addPosOrder,
          sequence_id: currentSeqId,
        })
    })
    .then((results)=>{
        console.log('results of adding user pose to sequence', results);
        res.redirect(`/sequence/${currentSeqId}`);
      })
    .catch((err)=>{
      next(err);
    })
  } else {
    res.redirect("/");
  }
};

module.exports.addMoveToSeqEndFrUserPoses = (req, res, next) => {
  if (req.user) {
    console.log("adding to sequence");
    const { sequelize, SequenceUserPoses } = req.app.get('models');
    let addPosOrder = null;
    let max = null;
    let currentSeqId=parseInt(req.params.seq_id);
    sequelize.query(`SELECT * FROM "SequenceUserPoses", "User_Poses", "Poses" WHERE "SequenceUserPoses"."sequence_id"=${req.params.seq_id} AND "SequenceUserPoses".user_pose_id="User_Poses"."up_pk_id" AND "User_Poses".pose_id="Poses".id ORDER BY "SequenceUserPoses".position_order`)
    .then(results => {
      console.log("results from getting all from nothing!", results[0]);
      console.log("results from getting all from nothing!", results[0].length);
      if (results[0].length === 0) {
       max = 0;
      } else {
        let orderP = results[0].map(function(each){
          return each.position_order
        })
        max = orderP.reduce(function(a, b) {
          return Math.max(a, b);
        });
      }
      addPosOrder = max + 1;
      return SequenceUserPoses.create({
        user_pose_id: parseInt(req.params.UP_id),
        position_order: addPosOrder,
        sequence_id: currentSeqId,
      })
    })
    .then((results)=>{
          console.log('results of adding user pose to sequence', results);
          res.redirect(`/sequence/${currentSeqId}`);
        })
    .catch((err)=>{
      next(err);
    })
  } else {
    res.redirect('/');
  }
};


module.exports.sidesearchPoses = (req, res, next) => {
  if (req.user) {
    const { Pose, Category, Level, sequelize } = req.app.get("models");
    let cats = null;
    let levs = null;
    let poses = null;
    let moves = null;
    getMyMoves(req, next)
    .then(results => {
        // req.session.myMoves = results[0];
        // myMoves = req.session.myMoves;
        myMoves=results[0];
        return sequelize.query(`
      SELECT * FROM "SequenceUserPoses", "User_Poses", "Poses" WHERE "SequenceUserPoses"."sequence_id"=${req.params.seq_id} AND "SequenceUserPoses".user_pose_id="User_Poses"."up_pk_id" AND "User_Poses".pose_id="Poses".id ORDER BY "SequenceUserPoses".position_order`);
    })
    .then(results => {
        moves = results[0];
      return Level.findAll()
    })
    .then(levels => {
      levs = levels;
      return Category.findAll();
    })
    .then(categories => {
      cats = categories;
      console.log("cats?", cats);
      return Pose.findAll({
        raw: true,
        where: {
          meta_title: {
            $iLike: `%${req.query.title}%`
          }
        }
      })
    })
    .then(poses => {
      if (poses[0]) {
        poses = poses;
      }
        res.render("viewSeq", {
          moves, 
          poses, 
          myMoves,
          cats,
          levs, 
          seq_id: req.params.seq_id });
    })
    .catch(err => {
        next(err);
    });
  } else {
    res.redirect("/");
  }
};

module.exports.sidesearchLevels = (req, res, next) => {
  if (req.user) {
    const { Pose, Category, Level, sequelize } = req.app.get("models");
    let cats = null;
    let levs = null;
    let poses = null;
    let moves = null;
    getMyMoves(req, next)
      .then(results => {
      // req.session.myMoves = results[0];
      // myMoves = req.session.myMoves;
      myMoves = results[0];
        return sequelize.query(`
      SELECT * FROM "SequenceUserPoses", "User_Poses", "Poses" WHERE "SequenceUserPoses"."sequence_id"=${req
        .params
        .seq_id} AND "SequenceUserPoses".user_pose_id="User_Poses"."up_pk_id" AND "User_Poses".pose_id="Poses".id ORDER BY "SequenceUserPoses".position_order`);
      })
      .then(results => {
        moves = results[0];
        return Level.findAll();
      })
      .then(levels => {
        levs = levels;
        return Category.findAll();
      })
      .then(categories => {
        cats = categories;
        console.log("cats?", cats);
        return Pose.findAll({
          raw: true,
          where: {
            level_id: `${req.query.lev_id}`
          }
        });
      })
      .then(poses => {
        if (poses[0]) {
          poses = poses;
        }
        res.render("viewSeq", {
          moves,
          poses,
          myMoves,
          cats,
          levs,
          seq_id: req.params.seq_id
        });
      })
      .catch(err => {
        next(err);
      });
  } else {
    res.redirect("/");
  }
};

module.exports.sidesearchCategories = (req, res, next) => {
  if (req.user) {
    const { Pose, Category, Level, sequelize } = req.app.get("models");
    let cats = null;
    let levs = null;
    let poses = null;
    let moves = null;
    getMyMoves(req, next)
      .then(results => {
      // req.session.myMoves = results[0];
      // myMoves = req.session.myMoves;
      myMoves = results[0];
        return sequelize.query(`
      SELECT * FROM "SequenceUserPoses", "User_Poses", "Poses" WHERE "SequenceUserPoses"."sequence_id"=${req
        .params
        .seq_id} AND "SequenceUserPoses".user_pose_id="User_Poses"."up_pk_id" AND "User_Poses".pose_id="Poses".id ORDER BY "SequenceUserPoses".position_order`);
      })
      .then(results => {
        moves = results[0];
        return Level.findAll();
      })
      .then(levels => {
        levs = levels;
        return Category.findAll();
      })
      .then(categories => {
        cats = categories;
        console.log("cats?", cats);
        return Pose.findAll({
          raw: true,
          where: {
            category_id: `${req.query.cat_id}`
            }
        });
      })
      .then(poses => {
        if (poses[0]) {
          poses = poses;
        }
        res.render("viewSeq", {
          moves,
          poses,
          myMoves,
          cats,
          levs,
          seq_id: req.params.seq_id
        });
      })
      .catch(err => {
        next(err);
      });
  } else {
    res.redirect("/");
  }
};

module.exports.playSeq = (req, res, next) => {
  const { sequelize } = req.app.get('models');
  let moves = null;
  let seq_id = req.params.seq_id;
  sequelize.query(`SELECT * FROM "SequenceUserPoses", "User_Poses", "Poses" WHERE "SequenceUserPoses"."sequence_id"=${req.params.seq_id} AND "SequenceUserPoses".user_pose_id="User_Poses"."up_pk_id" AND "User_Poses".pose_id="Poses".id ORDER BY "SequenceUserPoses".position_order`)
  .then((results) => {
    moves = results[0];
    console.log("the moobs like jabba i mean moves like frogger", moves);
    res.render("playSeq", {
      moves,
      seq_id
    })
  })
  .catch((err) => {
    next(err);
  })
};

module.exports.addNewSeq = (req, res, next) => {
  const { Sequence, User_Poses, sequelize, SequenceUserPoses } = req.app.get('models');
  console.log("hopefully userid", req.user.id);
  console.log("hopefully sequence title", req.body.reqTitle);
  Sequence.create({
    user_id: req.user.id,
    title: req.body.seqTitle
  })
  .then((results) => {
    console.log("whaaaat?", results.dataValues);
    let seq_id = results.dataValues.id;
    //basically at this point I want to call module.exports.addNewMoveToSeqEnd 
      res.redirect(`/sequence/${seq_id}`);
    })
    .catch((err)=>{next(err)});
  };
  
  module.exports.deleteSequence = (req, res, next) =>{
    const {Sequence} = req.app.get('models');
    Sequence.destroy({ where: { id: req.params.id } })
    .then( (results)=>{
      console.log(results);
      res.status(200);
      next();
   })
   .catch((err)=>{next(err)});
};