const tbl = require("../models");
const KamarHotel = tbl.HotelKamar;
const User = tbl.User;
const Booking = tbl.Booking;

exports.get = async (req, res) => {
  let dataBooking = await Booking.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: [
      {
        model: tbl.HotelKamar,
        as: "detail_kamar",
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: {
          model: tbl.Hotel,
          as: "detail_hotel",
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        }
      },
      {
        model: tbl.User,
        as: "detail_user",
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      },
    ],
  })
  return res.json({
    success: true,
    data: dataBooking,
  })
}

exports.post = async (req, res) => {

  let dataKamar = await KamarHotel.findOne({
    where: {
      id: req.body.kamar_id,
    }
  });

  let jumlahHari = ((new Date(req.body.tanggal_check_out) - new Date(req.body.tanggal_check_in)) / (1000 * 60 * 60 * 24));

  let dataBooking = {
    user_id: req.user.id,
    kamar_id: req.body.kamar_id,
    harga_kamar: dataKamar.harga * jumlahHari,
    pendapatan_bersih: req.body.sales_code ? ((dataKamar.harga * jumlahHari) * 80/100) : (dataKamar.harga * jumlahHari),
    pendapatan_sales: req.body.sales_code ? ((dataKamar.harga * jumlahHari) * 20/100) : 0,
    sales_code: req.body.sales_code,
    tanggal_check_in: req.body.tanggal_check_in,
    tanggal_check_out: req.body.tanggal_check_out,
  }

  let checkTanggal = await Booking.findAll({
    where: {
      kamar_id: req.body.kamar_id,
      tanggal_check_in: new Date(req.body.tanggal_check_in),
      tanggal_check_out: new Date(req.body.tanggal_check_out),
    }
  });

  if (checkTanggal != "") {
    return res.json({
      success: false,
      message: "Tanggal tersebut sudah terisi."
    })
  }

  let dataUser = await User.findOne({
    where: {
      id: req.user.id,
    }
  })

  let dataPakAmir = await User.findOne({
    where: {
      id: 1,
    }
  })

  let dataSales = {}

  if (req.body.sales_code) {
    dataSales = await User.findOne({
      where: {
        sales_code: req.body.sales_code,
      }
    })

    if (req.body.sales_code == dataUser.sales_code) {
      return res.json({
        success: false,
        message: "Sales Code sama dengan pengguna.",
      })
    }

    dataSales.saldo = parseInt(dataSales.saldo) + parseInt(dataBooking.pendapatan_sales)
  }

  if (dataBooking) {
    if (dataUser.saldo < dataBooking.harga_kamar) {
      return res.json({
        success: false,
        message: "Saldo Anda tidak mencukupi.",
      })
    }

    dataUser.saldo -= dataBooking.harga_kamar
    dataPakAmir.saldo = parseInt(dataPakAmir.saldo) + parseInt(dataBooking.pendapatan_bersih)
  }

  try {
    let updateUser = { saldo: parseInt(dataUser.saldo) }
    await User.update(updateUser, {
      where: {
        id: req.user.id,
      }
    })

    let updatePemilik = { saldo: parseInt(dataPakAmir.saldo) }
    await User.update(updatePemilik, {
      where: {
        id: dataPakAmir.id,
      }
    })

    if (req.body.sales_code) {
      
      let updateSales = { saldo: parseInt(dataSales.saldo) }
      await User.update(updateSales, {
        where: {
          id: dataSales.id,
        }
      })
    }
    
    let insertBooking = await Booking.create(dataBooking);
    return res.json({
      success: true,
      message: "Kamar berhasil dibooking."
    })
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}