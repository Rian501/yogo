'use strict';

const {sequenceUserPoses} = require('./data/sequence-user-poses');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('SequenceUserPoses', sequenceUserPoses, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("SequenceUserPoses", null, {});
  }
};
