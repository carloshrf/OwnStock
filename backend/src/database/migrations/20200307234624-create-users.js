'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('users', { 
        id: {
          
        }
       });

  },

  down: (queryInterface) => {

      return queryInterface.dropTable('users');

  }
};
