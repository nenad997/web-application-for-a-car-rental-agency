const express = require("express");
const { body } = require("express-validator");

const {
  getAllCars,
  addNewCar,
  getCarById,
  editCar,
} = require("../controllers/feed");

const router = express.Router();

router.get("/", getAllCars);
router.post(
  "/add-new-car",
  [
    body("vehicleMake").trim().isLength({ min: 3, max: 20 }),
    body("vehicleModel").trim().isLength({ min: 3, max: 20 }),
    body("registrationNumber").custom((value) => {
      const regex = /^[\p{L}]{2}-\d+-[\p{L}]{2}$/u;
      if (!regex.test(value)) {
        throw new Error(
          "Registration number must be in the format MM - Numbers - MM"
        );
      }
      return true;
    }),
    body("imageUrl").isURL(),
    body("fuel").isString(),
    body("price").isNumeric(),
  ],
  addNewCar
);
router.get("/car/:carId", getCarById);
router.put(
  "/edit/:carId",
  [
    body("vehicleMake").trim().isLength({ min: 3, max: 20 }),
    body("vehicleModel").trim().isLength({ min: 3, max: 20 }),
    body("registrationNumber").custom((value) => {
      const regex = /^[\p{L}]{2}-\d+-[\p{L}]{2}$/u;
      if (!regex.test(value)) {
        throw new Error(
          "Registration number must be in the format MM - Numbers - MM"
        );
      }
      return true;
    }),
    body("imageUrl").isURL(),
    body("fuel").isString(),
    body("price").isNumeric(),
  ],
  editCar
);

module.exports = router;
