'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pose = sequelize.define('Pose', {
    category_id: DataTypes.INTEGER,
    comments_count: DataTypes.INTEGER,
    cover_thumbnail: DataTypes.STRING,
    cover_original: DataTypes.STRING,
    level_id: DataTypes.INTEGER,
    likes_count: DataTypes.INTEGER,
    meta_title: DataTypes.STRING,
    muscle: DataTypes.STRING,
    photo: DataTypes.STRING,
    sanskrit_name: DataTypes.STRING,
    video_url: DataTypes.STRING,
    title: DataTypes.STRING,
    meta_description: DataTypes.STRING,
    slug: DataTypes.STRING
  })
  
     Pose.associate = function(models) {
        Pose.belongsTo(models.Category, {
          foreignKey: 'category_id'
        });
        Pose.belongsTo(models.Level, {
          foreignKey: 'level_id'
        });
        // Pose.belongsToMany(models.Sequence, {
        //   through: 'Sequence_Poses',
        //   foreignKey: 'pose_id'
        // });
        Pose.belongsToMany(models.User, {
          through: 'User_Poses',
          foreignKey: 'pose_id'
        });


      }
  return Pose;
};