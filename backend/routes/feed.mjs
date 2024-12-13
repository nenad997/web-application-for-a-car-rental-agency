import { Router } from "express";

import {
  getAll,
  addNew,
  getById,
  edit,
  deleteOne,
  rent,
  getRented,
} from "../controllers/feed.mjs";
import isAuth from "../middlewares/isAuth.mjs";
import {
  addOrEditNewCarValidationChain,
  getRentedCarsValidationChain,
} from "../validation/feed-chains.mjs";
import upload from "../middlewares/image-upload.mjs";

const router = Router();

router.get("/", getAll);

router.post(
  "/",
  isAuth,
  upload.single("image"),
  addOrEditNewCarValidationChain,
  addNew
);

router.get("/:carId", getById);

router.put(
  "/:carId",
  isAuth,
  upload.single("image"),
  addOrEditNewCarValidationChain,
  edit
);

router.delete("/:carId", isAuth, deleteOne);

router.patch("/:carId", isAuth, rent);

router.get("/rents", getRentedCarsValidationChain, getRented);

export default router;
