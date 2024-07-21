import React from "react";
import { useLoaderData } from "react-router-dom";

import classes from "./CarDetails.module.css";

const CarDetails = () => {
  const data = useLoaderData();

  return (
    <div
      className={classes.item}
      style={{ border: `4px solid ${data.available ? "green" : "red"}` }}
    >
      <h3 className={classes.title}>
        {data.vehicleMake} - {data.vehicleModel}
      </h3>
      <figure className={classes.figure}>
        <img
          className={classes.image}
          src={data.imageUrl}
          alt={data.vehicleMake}
        />
      </figure>
      <details className={classes.details}>
        <summary>Details</summary>
        <p>Fuel: {data.fuel}</p>
        <p>
          Price {"(€ per day)"}: {data.price}
        </p>
        <p>More: {data.moreInfo}</p>
      </details>
    </div>
  );
};

export default CarDetails;
