'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    name: DataTypes.STRING
  });

  Category.associate = function(models) {
        Category.hasMany(models.Pose, {
          foreignKey: 'category_id'
        })
      }
  return Category;
};