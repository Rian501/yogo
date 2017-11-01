'use strict';
module.exports = (sequelize, DataTypes) => {
  var SequenceUserPoses = sequelize.define('SequenceUserPoses', {
    position_order: DataTypes.INTEGER,
    card_timing: DataTypes.INTEGER
  })
  return SequenceUserPoses;
};