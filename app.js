const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
require("dotenv").config();

app.use(multer({ 
  allowedFile:function(req, file, cb) {
    if (!file.originalname.match(/\.(pdf|csv|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only  files are allowed!';
        return cb(new Error('Only  files are allowed!'), false);
    }
    cb(null, true);
    },storage : multer.diskStorage({
      destination: './uploads',
      filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
      }
    }),
  })
  // .single("img"))       // for upload 1 img
  .array("img", 12))    // for upload more than 1 img

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use("/api/img", express.static(path.join(__dirname + "/uploads")));

app.use(cors())

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({})
});

require("./routes/user")(app);
require("./routes/booking")(app);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});