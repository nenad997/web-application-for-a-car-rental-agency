import React from "react";
import { Link, useLoaderData } from "react-router-dom";

import classes from "./CarList.module.css";
import Car from "./Car";

const CarList = () => {
  const cars = useLoaderData();

  if (cars.message) {
    return (
      <div className={classes.fallback}>
        <h1>Failed to fetch data</h1>
        <p>Something went wrong, please try again later</p>
      </div>
    );
  }

  if (cars && cars.length === 0) {
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
      {cars.map((car) => (
        <Car
          key={car._id}
          id={car._id}
          title={`${car.vehicleMake} - ${car.vehicleModel}`}
          imageUrl={car.imageUrl}
          price={car.price}
        />
      ))}
    </ul>
  );
};

export default CarList;
