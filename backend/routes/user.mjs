import { Router } from "express";
import { body } from "express-validator";

import { addUser, fetchUsers } from "../controllers/user.mjs";

const router = Router();

router.get("/", fetchUsers);

router.post(
  "/add",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .normalizeEmail(),
    body("username")
      .isLength({ min: 5, max: 25 })
      .withMessage("Invalid username"),
    body("id_card_number")
      .isNumeric()
      .withMessage("Id card number must be numeric value"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must contain at least 8 characters"),
  ],
  addUser
);

export default router;
