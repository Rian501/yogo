'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pose_Description = sequelize.define('Pose_Description', {
    pose_id: DataTypes.INTEGER,
    instructions: DataTypes.TEXT,
    variations: DataTypes.TEXT,
    prep_poses: DataTypes.TEXT,
    counter_poses: DataTypes.TEXT,
    sequences_with: DataTypes.TEXT,
    benefits: DataTypes.TEXT,
    mobility_up: DataTypes.STRING,
    strength_up: DataTypes.STRING
  });
  
  
  Pose_Description.associate = function(models) {
    Pose_Description.belongsTo(models.Pose, {
      foreignKey: 'pose_id'
    })
  }
  return Pose_Description;
};