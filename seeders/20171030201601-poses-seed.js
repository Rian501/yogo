'use strict';

const { poses } = require('./data/poses'); 

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Poses', poses, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Poses', null, {});
  }
};
