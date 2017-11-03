'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pose_Descriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pose_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Poses',
          key: 'id'
        },
				onUpdate: 'cascade',
				onDelete: 'cascade'
      },
      instructions: {
        type: Sequelize.TEXT
      },
      variations: {
        type: Sequelize.TEXT
      },
      prep_poses: {
        type: Sequelize.TEXT
      },
      counter_poses: {
        type: Sequelize.TEXT
      },
      sequences_with: {
        type: Sequelize.TEXT
      },
      benefits: {
        type: Sequelize.TEXT
      },
      mobility_up: {
        type: Sequelize.STRING
      },
      strength_up: {
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
    return queryInterface.dropTable('Pose_Descriptions');
  }
};