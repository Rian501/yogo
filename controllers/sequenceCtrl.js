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
      console.log("myMoves inside viewSeq", myMoves);
    return sequelize
      .query(`
    SELECT * FROM "SequenceUserPoses", "User_Poses", "Poses" WHERE "SequenceUserPoses"."sequence_id"=${req.params.seq_id} AND "SequenceUserPoses".user_pose_id="User_Poses"."id" AND "User_Poses".pose_id="Poses".id ORDER BY "SequenceUserPoses".position_order`)
    })
    .then(results => {
        let moves = results[0]
        // console.log("moves for digging", moves);
        //might need to add card timing as a number property for later manipulation rather than if-elsing it on the pugdom
        res.render('viewSeq', {
          moves,
          myMoves
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