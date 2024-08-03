import { Router } from "express";
import { body, query } from "express-validator";

import {
  getAllCars,
  addNewCar,
  getCarById,
  editCar,
  deleteCarById,
  rentCar,
  getRentedCars,
} from "../controllers/feed.mjs";
import isAuth from "../middlewares/isAuth.mjs";

const router = Router();

router.get("/", getAllCars);

router.post(
  "/api/cars",
  isAuth,
  [
    body("vehicleMake")
      .trim()
      .notEmpty()
      .withMessage("This field should not be empty")
      .isString(),
    body("vehicleModel")
      .trim()
      .notEmpty()
      .withMessage("This field should not be empty")
      .isString(),
    body("registrationNumber").custom((value, { req }) => {
      const regex = /^[\p{L}]{2}-\d+-[\p{L}]{2}$/u;
      if (!regex.test(value)) {
        throw new Error(
          "Registration number must be in the format MM - Numbers - MM"
        );
      }
      return true;
    }),
    body("imageUrl")
      .notEmpty()
      .withMessage("This field should not be empty")
      .isURL()
      .withMessage("This field must be a valid URL"),
    body("fuel")
      .notEmpty()
      .withMessage("This field should not be empty")
      .isString(),
    body("price")
      .notEmpty()
      .withMessage("This field should not be empty")
      .isString(),
  ],
  addNewCar
);

router.get("/api/cars/:carId", getCarById);

router.put(
  "/api/cars/:carId",
  isAuth,
  [
    body("vehicleMake")
      .trim()
      .notEmpty()
      .withMessage("This field should not be empty")
      .isString(),
    body("vehicleModel")
      .trim()
      .notEmpty()
      .withMessage("This field should not be empty")
      .isString(),
    body("registrationNumber").custom((value, { req }) => {
      const regex = /^[\p{L}]{2}-\d+-[\p{L}]{2}$/u;
      if (!regex.test(value)) {
        throw new Error(
          "Registration number must be in the format MM - Numbers - MM"
        );
      }
      return true;
    }),
    body("imageUrl")
      .notEmpty()
      .withMessage("This field should not be empty")
      .isURL()
      .withMessage("This field must be a valid URL"),
    body("fuel")
      .notEmpty()
      .withMessage("This field should not be empty")
      .isString(),
    body("price")
      .notEmpty()
      .withMessage("This field should not be empty")
      .isString(),
  ],
  editCar
);

router.delete("/api/cars/:carId", isAuth, deleteCarById);

router.patch("/api/cars/:carId", isAuth, rentCar);

router.get(
  "/api/rents",
  [
    query("idCardNumber")
      .isLength({ min: 5, max: 20 })
      .withMessage("This query field must be at least 5-20 characters"),
  ],
  getRentedCars
);

export default router;
