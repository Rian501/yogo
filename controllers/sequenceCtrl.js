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
        let moves = results[0]
        console.log("moves for digging", moves);
        //might need to add card timing as a number property for later manipulation rather than if-elsing it on the pugdom
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