require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const feedRoutes = require("./routes/feed");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(process.cwd(), "public")));

app.use(feedRoutes);

mongoose
  .connect(
    `mongodb+srv://Nenad:${process.env.password}@cluster0.ovwtp0c.mongodb.net/car-rental-app`
  )
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
