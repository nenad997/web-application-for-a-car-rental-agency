import React from "react";
import { redirect, json } from "react-router-dom";

import CarForm from "../components/forms/CarForm";
import {
  isDateValid,
  isRegistrationNumberValid,
  isValidURL,
} from "../util/validator";

const AddNewCar = () => {
  return <CarForm method="POST" />;
};

export default AddNewCar;

export async function action({ request, params }) {
  const formData = await request.formData();
  const {
    make,
    model,
    image,
    registration_number,
    expiration,
    moreInfo,
    fuel,
  } = Object.fromEntries(formData);
  console.log({
    make,
    model,
    image,
    registration_number,
    expiration,
    moreInfo,
    fuel,
  });

  const validationErrors = [];

  if (!make) {
    validationErrors.push({
      message: "Vehicle make property must be set",
      path: "make",
    });
  }

  if (!model) {
    validationErrors.push({
      message: "Vehicle model property must be set",
      path: "model",
    });
  }

  if (!isValidURL(image)) {
    validationErrors.push({
      message: "The value you provided is not a valid URL",
      path: "image",
    });
  }

  if (isRegistrationNumberValid(registration_number)) {
    validationErrors.push({
      message: "The value you provided is not a valid registration number",
      path: "reg_number",
    });
  }

  if (!isDateValid(expiration)) {
    validationErrors.push({
      message: "Invalid date provided",
      path: "date",
    });
  }

  if (fuel.toString() === "NONE") {
    validationErrors.push({
      message: "Fuel property must be set",
      path: "fuel",
    });
  }

  if (validationErrors.length > 0) {
    return json(
      { message: "Validation failed!", errors: validationErrors },
      { status: 403 }
    );
  }
  
  return null;
}
