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
  addOrEditNewCarValidationChain,
  getRentedCarsValidationChain,
} from "../validation/feed-chains.mjs";

const router = Router();

router.get("/cars", getAllCars);

router.post("/car", isAuth, addOrEditNewCarValidationChain, addNewCar);

router.get("/cars/:carId", getCarById);

router.put("/cars/:carId", isAuth, addOrEditNewCarValidationChain, editCar);

router.delete("/cars/:carId", isAuth, deleteCarById);

router.patch("/cars/:carId", isAuth, rentCar);

router.get("/rents", getRentedCarsValidationChain, getRentedCars);

export default router;
