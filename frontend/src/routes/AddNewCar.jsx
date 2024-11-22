import React from "react";
import { redirect, json } from "react-router-dom";

import CarForm from "../components/forms/CarForm";
import { isDateValid, isRegistrationNumberValid } from "../util/validator";
import { getAuthToken } from "../util/authorization";

const AddNewCar = () => {
  return <CarForm method="POST" />;
};

export default AddNewCar;

export async function action({ request }) {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  const formData = await request.formData();
  const entries = Object.fromEntries(formData);

  const pickedImage = formData.get("image");

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

  if (!pickedImage || pickedImage.size === 0) {
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
    const response = await fetch("http://localhost:3000/api/car", {
      method: "POST",
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
  } catch (error) {
    return json({ message: error.message }, { status: error.status });
  }
}

export function loader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }
  return null;
}
