import React from "react";
import { useLoaderData, Link, useParams } from "react-router-dom";

import classes from "./CarDetails.module.css";

const CarDetails = () => {
  const { carId } = useParams();
  const loaderData = useLoaderData();
  const data = loaderData?.data ? loaderData.data : null;

  if (!data) {
    return <h1>No data</h1>;
  }

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
      <div style={{ textAlign: "center" }}>
        <Link
          className={classes["edit-link"]}
          to={`/edit/${carId}?edit=${true}`}
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default CarDetails;
