const checkToken = require("../helpers/checkToken.js");

module.exports = (app) => {
  const Controller = require("../controllers/userController.js");

  var router = require("express").Router();

  router.get("/", checkToken, Controller.get);
  router.get("/penghasilan", checkToken, Controller.getPenghasilan);
  router.post("/login", Controller.login);

  app.use("/user", router);
}