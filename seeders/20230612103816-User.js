'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [
      {
        nama: 'Pak Amir',
        no_hp: 6283811345678,
        alamat: 'Sentul City',
        sales_code: 'SLS-001',
        saldo: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: 'Pak Sales',
        no_hp: 6281245678901,
        alamat: 'Bogor Raya',
        sales_code: 'SLS-002',
        saldo: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: 'Pak Tamu',
        no_hp: 6282141212322,
        alamat: 'Jakarta Raya',
        sales_code: 'SLS-003',
        saldo: 5000000,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
