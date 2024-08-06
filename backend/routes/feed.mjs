import { Router } from "express";

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
import {
  addNewCarValidationChain,
  getRentedCarsValidationChain,
} from "../validation/feed-chains.mjs";

const router = Router();

router.get("/", getAllCars);

router.post("/api/cars", isAuth, addNewCarValidationChain, addNewCar);

router.get("/api/cars/:carId", getCarById);

router.put("/api/cars/:carId", isAuth, addNewCarValidationChain, editCar);

router.delete("/api/cars/:carId", isAuth, deleteCarById);

router.patch("/api/cars/:carId", isAuth, rentCar);

router.get("/api/rents", getRentedCarsValidationChain, getRentedCars);

export default router;
