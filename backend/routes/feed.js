const express = require("express");

const { getAllCars } = require("../controllers/feed");

const router = express.Router();

router.get("/", getAllCars);

module.exports = router;
