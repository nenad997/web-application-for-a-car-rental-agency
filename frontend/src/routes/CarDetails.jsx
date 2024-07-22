import React from "react";
import { json } from "react-router-dom";

import Details from "../components/car/CarDetails";

const CarDetails = () => {
  return <Details />;
};

export default CarDetails;

export async function loader({ params }) {
  try {
    const { carId } = params;

    const response = await fetch(`http://localhost:3000/car/${carId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const responseData = await response.json();
    return responseData;
  } catch (err) {
    return json({ message: err.message, data: null }, { status: 404 });
  }
}
