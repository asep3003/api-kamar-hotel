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
  const transaction = await tbl.sequelize.transaction();

  try {
    let dataKamar = await KamarHotel.findOne({
      where: {
        id: req.body.kamar_id,
      },
      transaction,
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

    let currentDate = new Date();

    if (new Date(req.body.tanggal_check_in) < currentDate) {
      await transaction.rollback();
      return res.json({
        success: false,
        message: "Tanggal check-in tidak boleh kurang dari tanggal hari ini.",
      })
    }

    if (req.body.tanggal_check_in > req.body.tanggal_check_out) {
      await transaction.rollback();
      return res.json({
        success: false,
        message: "Tanggal check-out tidak boleh kurang dari tanggal check-in.",
      })
    }

    let checkTanggal = await Booking.findAll({
      where: {
        kamar_id: req.body.kamar_id,
        tanggal_check_in: new Date(req.body.tanggal_check_in),
        tanggal_check_out: new Date(req.body.tanggal_check_out),
      },
      transaction,
    });
  
    if (checkTanggal.length > 0) {
      return res.json({
        success: false,
        message: "Tanggal tersebut sudah terisi."
      })
    }
  
    let dataUser = await User.findOne({
      where: {
        id: req.user.id,
      },
      transaction,
    })
  
    let dataPakAmir = await User.findOne({
      where: {
        id: 1,
      },
      transaction,
    })
  
    let dataSales = {}
  
    if (req.body.sales_code) {
      dataSales = await User.findOne({
        where: {
          sales_code: req.body.sales_code,
        },
        transaction,
      })
  
      if (req.body.sales_code == dataUser.sales_code) {
        await transaction.rollback();
        return res.json({
          success: false,
          message: "Sales Code sama dengan pengguna.",
        })
      }
  
      if (dataPakAmir.sales_code == req.body.sales_code) {
        dataSales.saldo = parseInt(dataSales.saldo) + parseInt(dataBooking.pendapatan_bersih)
      }
      dataSales.saldo = parseInt(dataSales.saldo) + parseInt(dataBooking.pendapatan_sales)
    }
  
    if (dataBooking) {
      if (dataUser.saldo < dataBooking.harga_kamar) {
        await transaction.rollback();
        return res.json({
          success: false,
          message: "Saldo Anda tidak mencukupi.",
        })
      }
  
      if (dataPakAmir.id == req.user.id) {
        dataUser.saldo -= dataBooking.harga_kamar
        dataPakAmir.saldo = parseInt(dataPakAmir.saldo)
      } else {
        dataUser.saldo -= dataBooking.harga_kamar
        dataPakAmir.saldo = parseInt(dataPakAmir.saldo) + parseInt(dataBooking.pendapatan_bersih)
      }
    }
  
    let updateUser = { saldo: parseInt(dataUser.saldo) }
    await User.update(updateUser, {
      where: {
        id: req.user.id,
      },
      transaction,
    })
  
    let updatePemilik = { saldo: parseInt(dataPakAmir.saldo) }
    await User.update(updatePemilik, {
      where: {
        id: dataPakAmir.id,
      },
      transaction,
    })
  
    if (req.body.sales_code) {
      
      let updateSales = { saldo: parseInt(dataSales.saldo) }
      await User.update(updateSales, {
        where: {
          id: dataSales.id,
        },
        transaction,
      })
    }
    
    let insertBooking = await Booking.create(dataBooking);
    await transaction.commit();
  
    return res.json({
      success: true,
      message: "Kamar berhasil dibooking."
    })
  } catch (error) {
    await transaction.rollback();
    await tbl.sequelize.close();
    console.log(error);
    return res.status(500);
  } 

}