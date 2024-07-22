import React from "react";
import { json } from "react-router-dom";

import CarList from "../components/feed/CarList";

const Feed = () => {
  return <CarList />;
};

export default Feed;

export async function loader() {
  try {
    const response = await fetch("http://localhost:3000/");

    if (!response.ok) {
      throw new Error("Could not fetch data");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return json({ message: error.message, data: null }, { status: 404 });
  }
}
