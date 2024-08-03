import React from "react";
import { json, redirect, useLoaderData } from "react-router-dom";

import CarForm from "../components/forms/CarForm";
import {
  isValidURL,
  isRegistrationNumberValid,
  isDateValid,
} from "../util/validator";
import { getAuthToken } from "../util/authorization";

const Edit = () => {
  const loadedData = useLoaderData();

  return (
    <CarForm method="PATCH" car={loadedData?.data ? loadedData.data : null} />
  );
};

export default Edit;

export async function loader({ params }) {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  const { carId } = params;
  try {
    const response = await fetch(`http://localhost:3000/api/cars/${carId}`);

    if (!response.ok) {
      const error = new Error("Failed to fetch the car");
      error.status = 404;
      throw error;
    }

    const responseData = await response.json();
    return responseData;
  } catch (err) {
    return json({ message: err.message }, { status: err.status });
  }
}

export async function action({ params, request }) {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  const { carId } = params;
  const formData = await request.formData();
  const {
    make,
    model,
    image,
    registration_number,
    expiration,
    moreInfo,
    fuel,
    price,
  } = Object.fromEntries(formData);

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

  if (!price || isNaN(price) || +price < 0) {
    validationErrors.push({
      message: "Invalid price entered",
      path: "price",
    });
  }

  if (!isRegistrationNumberValid(registration_number)) {
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

  try {
    const response = await fetch(`http://localhost:3000/api/cars/${carId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        vehicleMake: make,
        vehicleModel: model,
        registrationNumber: registration_number.toUpperCase(),
        imageUrl: image,
        moreInfo,
        fuel,
        price,
        expiration,
      }),
    });

    if (!response.ok) {
      const error = new Error("An Error Occurred!");
      error.status = 500;
      throw error;
    }

    return redirect("/");
  } catch (err) {
    return json({ message: err.message }, { status: err.status });
  }
}
