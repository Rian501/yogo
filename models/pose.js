'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pose = sequelize.define('Pose', {
    category_id: DataTypes.INTEGER,
    comments_count: DataTypes.INTEGER,
    cover_thumbnail: DataTypes.STRING,
    cover_original: DataTypes.STRING,
    id: DataTypes.INTEGER,
    level_id: DataTypes.INTEGER,
    likes_count: DataTypes.INTEGER,
    meta_title: DataTypes.STRING,
    muscle: DataTypes.STRING,
    photo: DataTypes.STRING,
    sanskrit_name: DataTypes.STRING,
    video_url: DataTypes.STRING,
    title: DataTypes.STRING,
    slug: DataTypes.STRING
  })
  
     Pose.associate = function(models) {
        belongsTo(models.Category, {
          foreignKey: 'category_id'
        });
      }
    }
  });
  return Pose;
};