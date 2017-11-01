'use strict';

const { userPoses } = require("./data/user-poses");

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('User_Poses', userPoses, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('User_Poses', null, {});
  }
};
