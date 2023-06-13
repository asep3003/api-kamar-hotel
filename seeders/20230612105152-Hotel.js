'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Hotels', [
      {
        nama: "Hotel Seruni",
        alamat: "Puncak, Cisarua",
        no_hp: 123456789012,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Hotel Amarossa",
        alamat: "Bogor Raya",
        no_hp: 123456789012,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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
