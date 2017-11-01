'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sequence_Poses', {
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
      postion_order: {
        type: Sequelize.INTEGER
      },
      card_timing: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Sequence_Poses');
  }
};