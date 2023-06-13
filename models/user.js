'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    nama: DataTypes.STRING,
    no_hp: DataTypes.BIGINT,
    alamat: DataTypes.TEXT,
    sales_code: DataTypes.STRING,
    saldo: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};