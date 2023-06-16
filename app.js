const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();

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