import React from "react";
import { Link, useLoaderData } from "react-router-dom";

import classes from "./CarList.module.css";
import Car from "./Car";

const CarList = () => {
  const loaderData = useLoaderData();
  const data = loaderData?.data ? loaderData.data : [];

  if (!data) {
    return (
      <div className={classes.fallback}>
        <h1>Failed to fetch data</h1>
        <p>Something went wrong, please try again later</p>
      </div>
    );
  }

  if (data && data.length === 0) {
    return (
      <div className={classes.fallback}>
        <h1>Nothing to show here</h1>
        <p>Start adding some cars</p>
        <Link to="add-new-car" title="Start adding...">
          Add
        </Link>
      </div>
    );
  }

  return (
    <ul className={classes.list}>
      {data.map((item) => (
        <Car
          key={item._id}
          id={item._id}
          title={`${item.vehicleMake} - ${item.vehicleModel}`}
          imageUrl={item.imageUrl}
          price={item.price}
          isAvailable={item.available}
        />
      ))}
    </ul>
  );
};

export default CarList;
