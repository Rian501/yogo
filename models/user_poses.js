'use strict';
module.exports = (sequelize, DataTypes) => {
  var User_Poses = sequelize.define('User_Poses', {
    up_special_directions: DataTypes.STRING,
    up_timing: DataTypes.INTEGER,
    up_breath: DataTypes.STRING
  });
  
  User_Poses.associate = function(models) {
    User_Poses.belongsToMany(models.Sequence, {
      through: 'SequenceUserPoses',
      foreignKey: 'user_pose_id'
    })
  }

  return User_Poses;
};