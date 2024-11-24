import React, { useEffect, useState } from "react";
import { json, useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CarList from "../components/car/CarList";
import { generateToast } from "../util/toastify";

const Feed = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isNotified, setIsNotified] = useState(false);

  const auth = searchParams.get("auth");

  useEffect(() => {
    if (!auth) return;

    if (auth && !isNotified) {
      generateToast(
        auth === "logout" ? "Logout successful" : "Login successful 🏆"
      );
      setIsNotified(true);
    }

    const timer = setTimeout(() => {
      if (auth) {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.delete("auth");
        setSearchParams(updatedParams);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [auth, isNotified, searchParams]);

  return (
    <>
      <ToastContainer />
      <CarList />
    </>
  );
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
