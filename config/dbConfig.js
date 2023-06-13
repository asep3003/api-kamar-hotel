require("dotenv").config();

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_DATABASE,
  dialect: "postgres",
  pool: {
    max: 1000,
    min: 0,
    acquire: 30000,
    idle: 1000,
  },
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
  timezone: "Asia/Jakarta",
}