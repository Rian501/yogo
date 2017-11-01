'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User_Poses', {
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
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
				onUpdate: 'cascade',
				onDelete: 'cascade'
      },
      up_special_directions: {
        type: Sequelize.STRING
      },
      up_timing: {
        type: Sequelize.INTEGER
      },
      up_breath: {
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
    return queryInterface.dropTable('User_Poses');
  }
};