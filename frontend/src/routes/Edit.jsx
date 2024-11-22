import React from "react";
import { json, redirect, useLoaderData } from "react-router-dom";

import CarForm from "../components/forms/CarForm";
import { isRegistrationNumberValid, isDateValid } from "../util/validator";
import { getAuthToken } from "../util/authorization";

const Edit = () => {
  const loadedData = useLoaderData();
  const car = loadedData?.data ?? null;

  return <CarForm method="PUT" car={car} />;
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
  const entries = Object.fromEntries(formData);

  const pickedImage = formData.get("image");
  const currentImage = formData.get("imagePreview");

  const validationErrors = [];

  if (!entries.vehicleMake) {
    validationErrors.push({
      message: "Vehicle make property must be set",
      path: "make",
    });
  }

  if (!entries.vehicleModel) {
    validationErrors.push({
      message: "Vehicle model property must be set",
      path: "model",
    });
  }

  if ((!pickedImage || pickedImage.size === 0) && !currentImage) {
    validationErrors.push({
      message: "Please select an image",
      path: "image",
    });
  }

  if (!entries.price || isNaN(entries.price) || +entries.price < 0) {
    validationErrors.push({
      message: "Invalid price entered",
      path: "price",
    });
  }

  if (!isRegistrationNumberValid(entries.registrationNumber)) {
    validationErrors.push({
      message: "The value you provided is not a valid registration number",
      path: "reg_number",
    });
  }

  if (!isDateValid(entries.regExpiration)) {
    validationErrors.push({
      message: "Invalid date provided",
      path: "date",
    });
  }

  if (entries.fuel.toString() === "NONE") {
    validationErrors.push({
      message: "Fuel property should not be NONE",
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
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
