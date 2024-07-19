import React from "react";
import { useLoaderData } from "react-router-dom";

import classes from "./CarList.module.css";
import Car from "./Car";

const CarList = () => {
  const cars = useLoaderData();

  return (
    <ul className={classes.list}>
      {cars.map((car) => (
        <Car
          key={car._id}
          id={car._id}
          title={`${car.vehicleMake} - ${car.vehicleModel}`}
          imageUrl={car.imageUrl}
        />
      ))}
    </ul>
  );
};

export default CarList;
