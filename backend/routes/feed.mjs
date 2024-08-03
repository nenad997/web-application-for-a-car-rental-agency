import { Router } from "express";
import { body } from "express-validator";

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

router.get("/api/cars/:carId", getCarById);

router.put(
  "/api/cars/:carId",
  isAuth,
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

router.delete("/api/cars/:carId", isAuth, deleteCarById);

router.patch("/api/cars/:carId", isAuth, rentCar);

router.get("/api/rents", getRentedCars);

export default router;
