'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sequence_Poses = sequelize.define('SequenceUserPoses', {
    position_order: DataTypes.INTEGER,
    card_timing: DataTypes.INTEGER
  })
  return SequenceUserPoses;
};