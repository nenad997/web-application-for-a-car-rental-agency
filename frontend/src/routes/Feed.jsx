import React from "react";
import { json } from "react-router-dom";

import CarList from "../components/car/CarList";

const Feed = () => {
  return <CarList />;
};

export default Feed;

export async function loader({ request }) {
  const regex = /[?&]limit=(\d+)/;
  const match = request.url.match(regex);
  const limit = Boolean(match) ? match[1] : 2;

  try {
    const response = await fetch(
      `http://localhost:3000/api/cars?limit=${limit}`
    );

    if (!response.ok) {
      throw new Error("Could not fetch data");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return json({ message: error.message, data: null }, { status: 404 });
  }
}
