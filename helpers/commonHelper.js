const crypto = require("crypto");

class CommonHelper {
  static encryptPassword(password) {
    let key = process.env.USER_PASSWORD_KEY;
    var hash = crypto.createHmac("sha512", key);
    return hash.update(password).digest("hex");
  }

  static randomInt(length) {
    let result = "";
    let characters = "0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

module.exports = CommonHelper