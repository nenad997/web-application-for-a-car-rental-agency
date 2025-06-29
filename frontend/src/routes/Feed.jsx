import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CarList from "../components/car/CarList";
import { generateToast } from "../util/toastify";
import { fetchData } from "../store/slices/feed-slice";

const Feed = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isNotified, setIsNotified] = useState(false);
  const dispatch = useDispatch();

  const auth = searchParams.get("auth");
  const limit = searchParams.get("limit");

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

  useEffect(() => {
    dispatch(fetchData(limit));
  }, [limit]);

  return (
    <>
      <ToastContainer />
      <CarList />
    </>
  );
};

export default Feed;
