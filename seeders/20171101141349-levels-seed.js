'use strict';

const { levels } = require("./data/levels"); 


module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Levels', levels, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Levels', null, {});
  }
};
