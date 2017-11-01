'use strict';
module.exports = (sequelize, DataTypes) => {
  var Level = sequelize.define('Level', {
    name: DataTypes.STRING
  })
  
  Level.associate = function(models) {
      Level.hasMany(models.Pose, {
        foreignKey: 'level_id'
      });
  }
  return Level;
};