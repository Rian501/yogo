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
    `SELECT * FROM "User_Poses", "Poses" WHERE "User_Poses".pose_id="Poses".id`
  );
};

module.exports.viewSeq = (req, res, next) => {
  if (req.user) {
    const { sequelize } = req.app.get('models');
    getMyMoves(req, next)
    .then(results => {
      req.session.myMoves = results[0];
      myMoves = req.session.myMoves;
      return sequelize
      .query(`
      SELECT * FROM "SequenceUserPoses", "User_Poses", "Poses" WHERE "SequenceUserPoses"."sequence_id"=${req.params.seq_id} AND "SequenceUserPoses".user_pose_id="User_Poses"."up_pk_id" AND "User_Poses".pose_id="Poses".id ORDER BY "SequenceUserPoses".position_order`)
    })
    .then(results => {
      let moves = results[0]
      // console.log("moves for digging", moves);
      //might need to add card timing as a number property for later manipulation rather than if-elsing it on the pugdom
      res.render('viewSeq', {
        moves,
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
    const { sequelize, Sequence } = req.app.get('models');
    getMyMoves(req, next)
    .then(results => {
      req.session.myMoves = results[0];
      //  console.log("myMoves inside userSeqs", myMoves);
      return Sequence.findAll({
        where: {user_id: req.user.id}
      })
    })
    .then( (seqs) => {
      myMoves = req.session.myMoves;
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
      addPosOrder = parseInt(results[0].length + 1);
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
    //length is not enough -- need to find the highest number and add it after that.
    //might be ok once sortable and reassigning numbers anyway, but for now...
    //position order of new item must be higher than the highest one
    let currentSeqId=parseInt(req.params.seq_id);
    sequelize.query(`SELECT * FROM "SequenceUserPoses", "User_Poses", "Poses" WHERE "SequenceUserPoses"."sequence_id"=${req.params.seq_id} AND "SequenceUserPoses".user_pose_id="User_Poses"."up_pk_id" AND "User_Poses".pose_id="Poses".id ORDER BY "SequenceUserPoses".position_order`)
    .then(results => {
      console.log("results[0]", results[0]);
      console.log("results[0]", results[0]);
      let orderP = results[0].map(function(each){
        return each.position_order
      })
      let max = orderP.reduce(function(a, b) {
        return Math.max(a, b);
      });
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
        req.session.myMoves = results[0];
        myMoves = req.session.myMoves;
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
      return Pose.findAll({
        raw: true,
        where: {
          meta_title: {
            $iLike: `%${req.query.title}%`
          }
        }
      });
    })
    .then(poses => {
      if (poses[0]) {
        poses = poses;
      }
      console.log("POSES???!!?!!!!!!!!!!!!!!!!!!!!!!", poses);
        res.render("viewSeq", {
          moves, 
          poses, 
          myMoves, 
          seq_id: req.params.seq_id });
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