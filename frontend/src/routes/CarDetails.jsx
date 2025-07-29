import React from "react";
import { json, redirect } from "react-router-dom";

import Details from "../components/car/CarDetails";
import { getAuthToken } from "../util/authorization";

const CarDetails = () => {
  return <Details />;
};

export default CarDetails;

export async function loader({ params }) {
  try {
    const { carId } = params;

    const response = await fetch(`http://localhost:3000/api/cars/${carId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const responseData = await response.json();
    return responseData;
  } catch (err) {
    return json({ message: err.message, data: null }, { status: 404 });
  }
}

export async function action({ params, request }) {
  const token = getAuthToken();
  const { carId } = params;
  const formData = await request.formData();
  const { cancelRent, userId } = Object.fromEntries(formData);

  if (!userId) {
    return json({ message: "Please select a user", path: "picker" });
  }

  try {
    const response = await fetch(`http://localhost:3000/api/cars/${carId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cancelRent: cancelRent === "true" ? true : false,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update the car");
    }

    return redirect("/");
  } catch (err) {
    return json({ message: err.message }, { status: 406 });
  }
}
