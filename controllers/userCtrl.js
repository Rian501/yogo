"use strict";
const passport = require("passport");

module.exports.getMyMoves = (req, res, next) => {
  const { User_Poses } = require('models');
  User_Poses.findAll({where:{id:req.user.id}})
  .then( (moves) => {
      myMoves = moves;
  })
};