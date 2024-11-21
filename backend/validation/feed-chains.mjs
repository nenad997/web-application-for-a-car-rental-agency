import { body, query } from "express-validator";

export const addOrEditNewCarValidationChain = [
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
  body("fuel")
    .notEmpty()
    .withMessage("This field should not be empty")
    .isString(),
  body("price")
    .notEmpty()
    .withMessage("This field should not be empty")
    .isString(),
  body("regExpiration")
    .notEmpty()
    .withMessage("This field should not be empty")
    .isDate()
    .withMessage("This field must be a date"),
];

export const getRentedCarsValidationChain = [
  query("idCardNumber")
    .isLength({ min: 5, max: 20 })
    .withMessage("This query field must be at least 5-20 characters"),
];
