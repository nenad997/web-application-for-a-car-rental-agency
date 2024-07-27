import React, { useState, useEffect } from "react";
import { json, useLoaderData, useSearchParams } from "react-router-dom";

import CarList from "../components/feed/CarList";

const Feed = () => {
  const [_, setSearchParams] = useSearchParams();
  const loaderData = useLoaderData();
  const [limitValue, setLimitValue] = useState(2);

  const buttonBehaviour = limitValue < loaderData?.total;

  const loadMoreDataHandler = () => {
    setLimitValue((curLimit) =>
      curLimit < loaderData.total ? curLimit + 2 : curLimit
    );
  };
  
  useEffect(() => {
    setSearchParams({ limit: limitValue });
  }, [setSearchParams, limitValue]);

  return (
    <>
      <CarList />
      <div style={styles.wrapper}>
        <button
          disabled={!buttonBehaviour}
          onClick={loadMoreDataHandler}
          style={{
            ...styles.button,
            backgroundColor: !buttonBehaviour ? "lightgreen" : "green",
            cursor: !buttonBehaviour ? "not-allowed" : "pointer",
          }}
        >
          Load More
        </button>
      </div>
    </>
  );
};

export default Feed;

const styles = {
  wrapper: {
    textAlign: "center",
    margin: "30px 0"
  },
  button: {
    padding: "15px 22px",
    color: "white",
    textTransform: "uppercase",
    border: "none",
    borderRadius: "4px",
  },
};

export async function loader({ request }) {
  const regex = /[?&]limit=(\d+)/;
  const match = request.url.match(regex);
  const limit = Boolean(match) ? match[1] : 2;

  try {
    const response = await fetch(`http://localhost:3000/?limit=${limit}`);

    if (!response.ok) {
      throw new Error("Could not fetch data");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return json({ message: error.message, data: null }, { status: 404 });
  }
}
