'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HotelKamar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HotelKamar.init({
    hotel_id: DataTypes.INTEGER,
    nama_kamar: DataTypes.STRING,
    nomor_kamar: DataTypes.INTEGER,
    harga: DataTypes.BIGINT,
    deskripsi: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'HotelKamar',
  });
  return HotelKamar;
};