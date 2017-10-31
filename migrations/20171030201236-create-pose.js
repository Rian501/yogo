'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Poses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER
      },
      cover_original: {
        type: Sequelize.STRING
      },
      cover_thumbnail: {
        type: Sequelize.STRING
      },
      likes_count: {
        type: Sequelize.INTEGER
      },
      level_id: {
        type: Sequelize.INTEGER
      },
      meta_title: {
        type: Sequelize.STRING
      },
      muscle: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      sanskrit_name: {
        type: Sequelize.STRING
      },
      video_url: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Poses');
  }
};