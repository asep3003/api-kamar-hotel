const checkToken = require("../helpers/checkToken.js");

module.exports = (app) => {
  const Controller = require("../controllers/bookingController.js");

  var router = require("express").Router();

  router.post("/", checkToken, Controller.post);
  router.get("/booking-list", Controller.get);

  app.use("/booking", router);
}