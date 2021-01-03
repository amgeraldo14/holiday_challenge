'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      return queryInterface.bulkInsert('Customers',[
      {
        identityNumber: '1234567890123450',
        fullName: 'A.m.Geraldo',
        address: 'jalan pakubuwono',
        birthDate: '2008-03-01',
        gender: 'male',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        identityNumber: '11111111111111111120',
        fullName: 'Zoro',
        address: 'jalan grand line',
        birthDate: '2003-04-30',
        gender: 'male',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Customers', null, {})
  }
};
