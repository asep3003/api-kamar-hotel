const jwt = require("jsonwebtoken");
const tbl = require("../models");
const Model = tbl.User;
const accessTokenSecret = process.env.JWT_SECRET;

module.exports = async(req, res, next) => {
  const token = req.get("api-token") || req.query["api-token"];

  try {
    if (!token) throw "Required token.";

    let jwtData = jwt.verify(token, accessTokenSecret);
    if (!jwtData) throw "Invalid token.";
    let user = await Model.findOne({
      where: {
        no_hp: jwtData.no_hp,
      },
      attributes: [
        "id",
        "nama",
        "no_hp",
        "sales_code",
      ],
    });

    req.user = user;
  } catch (error) {
    let errMsg = error.message || error;
    let code = error.httpCode || 401;

    return res.status(code).json({
      success: false,
      message: errMsg,
    });
  }

  return next()
}