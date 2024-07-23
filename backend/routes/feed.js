const express = require("express");
const { body } = require("express-validator");

const {
  getAllCars,
  addNewCar,
  getCarById,
  editCar,
  deleteCarById,
} = require("../controllers/feed");

const router = express.Router();

router.get("/", getAllCars);
router.post(
  "/add-new-car",
  [
    body("vehicleMake").trim().notEmpty().isString(),
    body("vehicleModel").trim().notEmpty().isString(),
    body("registrationNumber").custom((value, { req }) => {
      const regex = /^[\p{L}]{2}-\d+-[\p{L}]{2}$/u;
      if (!regex.test(value)) {
        throw new Error(
          "Registration number must be in the format MM - Numbers - MM"
        );
      }
      return true;
    }),
    body("imageUrl").notEmpty().isURL(),
    body("fuel").notEmpty().isString(),
    body("price").isString(),
  ],
  addNewCar
);
router.get("/car/:carId", getCarById);
router.put(
  "/edit/:carId",
  [
    body("vehicleMake").trim().notEmpty().isString(),
    body("vehicleModel").trim().notEmpty().isString(),
    body("registrationNumber").custom((value, { req }) => {
      const regex = /^[\p{L}]{2}-\d+-[\p{L}]{2}$/u;
      if (!regex.test(value)) {
        throw new Error(
          "Registration number must be in the format MM - Numbers - MM"
        );
      }
      return true;
    }),
    body("imageUrl").notEmpty().isURL(),
    body("fuel").notEmpty().isString(),
    body("price").isString(),
  ],
  editCar
);

router.delete("/car/:carId", deleteCarById);

module.exports = router;
