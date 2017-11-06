"use strict";
const passport = require("passport");

module.exports.deleteCardFromSeq = (req, res, next) => {
  const { Sequence, SequenceUserPoses, User_Pose } = req.app.get('models');
  console.log("SUPid", req.params.SUP_id);
  console.log("seq id", req.params.seq_id);
  let backtoSeq = parseInt(req.params.seq_id);
  SequenceUserPoses.destroy({where: {seqUsPos_id:req.params.SUP_id}})
  .then( (result) => {
    console.log('backtoSeq logging', backtoSeq);
    // return res.status(303).redirect(`/sequence/${backtoSeq}`);
    // return res.redirect('back');
    next();
  })
  .catch( (err) => {
    next(err);
  })
}


module.exports.editSeq = (req, res, next) => {

};

module.exports.viewSeq = (req, res, next) => {
  if (req.user) {
    const { sequelize } = req.app.get('models');
    sequelize
      .query(`
    SELECT * FROM "SequenceUserPoses", "User_Poses", "Poses" WHERE "SequenceUserPoses"."sequence_id"=${req.params.seq_id} AND "SequenceUserPoses".user_pose_id="User_Poses"."id" AND "User_Poses".pose_id="Poses".id ORDER BY "SequenceUserPoses".position_order`)
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