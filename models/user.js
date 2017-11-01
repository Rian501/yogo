//check out the user and auth stuff from Joe example ***************

'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });
  
  User.associate = function(models) {
    User.hasMany(models.Sequence, {
      foreignKey: 'user_id'
    })
    User.belongsToMany(models.Pose, {
      through: 'User_Poses',
      foreignKey: 'user_id'
    })
  }
  return User;
};