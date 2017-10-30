'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pose = sequelize.define('Pose', {
    category_id: DataTypes.INTEGER,
    cover_thumbnail: DataTypes.STRING,
    level_id: DataTypes.INTEGER,
    meta_title: DataTypes.STRING,
    muscle: DataTypes.STRING,
    photo: DataTypes.STRING,
    sanskrit_name: DataTypes.STRING,
    video_url: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Pose;
};