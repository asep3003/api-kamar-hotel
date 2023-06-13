const tbl = require("../models");
const Model = tbl.User;
const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.JWT_SECRET;

exports.get = async (req, res) => {
  Model.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
  .then((data) => {
    return res.json({
      success: true,
      data: data,
    })
  }).catch((err) => {
    console.log(err);
    return res.status(500);
  });
}

exports.getPenghasilan = async (req, res) => {
  let data = await Model.findOne({where: {id: req.user.id}})
  return res.json({
    success: true,
    data: data,
  })
}

exports.login = async (req, res) => {
  let { nama, no_hp } = req.body;

  let user = await Model.findOne({
    where: {
      nama: nama,
      no_hp: no_hp,
    }
  });

  if (user) {
    const accessToken = jwt.sign(
      {
        id: user.id,
        nama: user.nama,
        no_hp: user.no_hp,
        sales_code: user.sales_code,
      },
      accessTokenSecret,
    );
    return res.json({
      success: true,
      data: {
        token: accessToken,
      },
    });
  } else {
    return res.json({
      success: false,
      message: "Pastikan Nama dan Nomor Handphone Anda benar.",
    })
  }
};