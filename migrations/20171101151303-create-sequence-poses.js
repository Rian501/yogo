'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SequenceUserPoses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_pose_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User_Poses',
          key: 'id'
        },
				onUpdate: 'cascade',
				onDelete: 'cascade'
      },
      sequence_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Sequences',
          key: 'id'
        },
				onUpdate: 'cascade',
				onDelete: 'cascade'
      },
      position_order: {
        type: Sequelize.INTEGER
      },
      card_timing: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('SequenceUserPoses');
  }
};