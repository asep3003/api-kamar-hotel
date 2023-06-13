'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('HotelKamars', [
      {
        hotel_id: 1,
        nama_kamar: "Siliwangi",
        nomor_kamar: 20,
        harga: 250000,
        deskripsi: "Kamar nyaman, harga terjangkau",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hotel_id: 1,
        nama_kamar: "Padjajaran",
        nomor_kamar: 30,
        harga: 260000,
        deskripsi: "Kamar nyaman, harga terjangkau",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hotel_id: 1,
        nama_kamar: "Angkasa",
        nomor_kamar: 40,
        harga: 550000,
        deskripsi: "Kamar nyaman, harga terjangkau",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hotel_id: 2,
        nama_kamar: "Lombok",
        nomor_kamar: 12,
        harga: 150000,
        deskripsi: "Kamar nyaman, harga terjangkau",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hotel_id: 2,
        nama_kamar: "Toba",
        nomor_kamar: 14,
        harga: 450000,
        deskripsi: "Kamar nyaman, harga terjangkau",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hotel_id: 2,
        nama_kamar: "Sentani",
        nomor_kamar: 16,
        harga: 650000,
        deskripsi: "Kamar nyaman, harga terjangkau",
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
