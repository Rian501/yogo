'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sequence = sequelize.define('Sequence', {
    title: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  });
  
  Sequence.associate = function(models) {
    Sequence.belongsTo(models.User, {
          foreignKey: 'user_id'
        })
      }
  return Sequence;
};