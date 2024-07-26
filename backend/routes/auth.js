const express = require("express");
const { body } = require("express-validator");

const { createUser, login, getUserDataById } = require("../controllers/auth");

const router = express.Router();

router.post(
  "/create-user",
  [
    body("email").notEmpty().isEmail().normalizeEmail(),
    body("user_name").notEmpty().isAlphanumeric(),
    body("id_card_number").notEmpty(),
    body("password")
      .notEmpty()
      .custom((value) => {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!regex.test(value)) {
          throw new Error("Invalid password provided");
        }
        return true;
      }),
    body("repeat_password")
      .notEmpty()
      .custom((value, { req }) => {
        const password = req.body.password;
        if (value.toString() !== password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
  ],
  createUser
);

router.post(
  "/login",
  [
    body("email").notEmpty().isEmail().normalizeEmail(),
    body("password")
      .notEmpty()
      .custom((value) => {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!regex.test(value)) {
          throw new Error("Invalid password provided");
        }
        return true;
      }),
  ],
  login
);

router.get("/user/:userId", getUserDataById);

module.exports = router;
