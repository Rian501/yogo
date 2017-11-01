'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sequence_Poses = sequelize.define('Sequence_Poses', {
    postion_order: DataTypes.INTEGER,
    card_timing: DataTypes.INTEGER
  })
  return Sequence_Poses;
};