import React, { useEffect, useState } from "react";
import { json, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CarList from "../components/car/CarList";

const Feed = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isNotified, setIsNotified] = useState(false);

  const isLoggedout =
    searchParams.get("logout") && searchParams.get("logout") === "success";

  useEffect(() => {
    if (isLoggedout && !isNotified) {
      toast("Logout successful", {
        style: {
          backgroundColor: "lightgreen",
          color: "black",
          fontSize: "15px",
        },
      });
      setIsNotified(true);
    }

    const timer = setTimeout(() => {
      if (isLoggedout) {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.delete("logout");
        setSearchParams(updatedParams);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isLoggedout, isNotified, searchParams, setSearchParams]);

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
