'use strict';

const { sequences } = require("./data/sequences"); 


module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Sequences', sequences, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Sequences', null, {});
  }
};
