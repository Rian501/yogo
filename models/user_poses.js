'use strict';
module.exports = (sequelize, DataTypes) => {
  var User_Poses = sequelize.define('User_Poses', {
    up_special_directions: DataTypes.STRING,
    up_timing: DataTypes.INTEGER,
    up_breath: DataTypes.STRING
  });
  
  User_Poses.associate = function(models) {
        // associations can be defined here
      }

  return User_Poses;
};