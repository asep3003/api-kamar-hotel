'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    user_id: DataTypes.INTEGER,
    kamar_id: DataTypes.INTEGER,
    harga_kamar: DataTypes.BIGINT,
    pendapatan_bersih: DataTypes.BIGINT,
    pendapatan_sales: DataTypes.BIGINT,
    sales_code: DataTypes.STRING,
    tanggal_check_in: DataTypes.DATE,
    tanggal_check_out: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};