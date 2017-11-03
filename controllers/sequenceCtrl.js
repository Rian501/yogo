"use strict";
const passport = require("passport");

module.exports.editSeq = (req, res, next) => {

};

module.exports.viewSeq = (req, res, next) => {
  if (req.user) {
    const { sequelize } = req.app.get('models');
    sequelize
      .query(`
    SELECT * FROM "SequenceUserPoses", "User_Poses", "Poses" WHERE "SequenceUserPoses"."sequence_id"=${req.params.id} AND "SequenceUserPoses".user_pose_id="User_Poses"."id" AND "User_Poses".pose_id="Poses".id ORDER BY "SequenceUserPoses".position_order`)
      .then(results => {
        console.log("results.Result", results.Result);
        console.log("results[0]", results[0]);
        console.log("results[0][0]", results[0][0]);
        let moves = results[0]
        // .map( function(each){
        //   return each.anonymous;
        // })
        console.log("moves", moves);
        res.render('viewSeq', {
          moves
        })
      })
      .catch(err => {
        next(err);
      });
  }
};

module.exports.userSeqs = (req, res, next) => {
    if (req.user) {
        const { Sequence } = req.app.get("models");
        Sequence.findAll({
            where: {user_id: req.user.id}
        })
        .then( (seqs) => {
            res.render('userSequences', {
                seqs
            })
        })
    } else {
       return res.redirect('/');
    }
};