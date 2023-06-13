'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      kamar_id: {
        type: Sequelize.INTEGER
      },
      harga_kamar: {
        type: Sequelize.BIGINT
      },
      pendapatan_bersih: {
        type: Sequelize.BIGINT
      },
      pendapatan_sales: {
        type: Sequelize.BIGINT
      },
      sales_code: {
        type: Sequelize.STRING
      },
      tanggal_check_in: {
        type: Sequelize.DATE
      },
      tanggal_check_out: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};