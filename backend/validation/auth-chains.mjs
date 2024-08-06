import { body } from "express-validator";

export const signupValidationChain = [
  body("email")
    .notEmpty()
    .withMessage("Email field should not be empty")
    .isEmail()
    .withMessage("Please use an email address format")
    .normalizeEmail(),
  body("username")
    .notEmpty()
    .withMessage("Username field should not be empty")
    .isAlphanumeric()
    .withMessage("Username field should contain both letters and numbers"),
  body("id_card_number")
    .notEmpty()
    .withMessage("Id card number field should not be empty"),
  body("password")
    .notEmpty()
    .withMessage(
      "Password must be at least 8 chars long both letters and numbers"
    )
    .custom((value) => {
      const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (!regex.test(value)) {
        throw new Error("Invalid password provided");
      }
      return true;
    }),
  body("repeat_password")
    .notEmpty()
    .withMessage("This field must match password field")
    .custom((value, { req }) => {
      const password = req.body.password;
      if (value.toString() !== password.toString()) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

export const loginValidationChain = [
  body("email")
    .notEmpty()
    .withMessage("Please enter a valid email address")
    .isEmail()
    .withMessage("Invalid email address provided")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage(
      "Password must be at least 8 chars long both letters and numbers"
    )
    .custom((value) => {
      const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (!regex.test(value)) {
        throw new Error("Invalid password provided");
      }
      return true;
    }),
];
