import React from "react";
import {
  useLoaderData,
  Link,
  useParams,
  useRouteLoaderData,
  Form,
  useNavigation,
} from "react-router-dom";

import classes from "./CarDetails.module.css";

const CarDetails = () => {
  const { carId } = useParams();
  const loaderData = useLoaderData();
  const token = useRouteLoaderData("root");
  const navigation = useNavigation();

  const data = loaderData?.data ? loaderData.data : null;

  const isSubmitting = navigation.state === "submitting";

  if (!data) {
    return <h1>No data</h1>;
  }

  return (
    <div
      className={classes.item}
      style={{ border: `2px solid ${data.available ? "green" : "red"}` }}
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
      {token && (
        <div className={classes.wrapper}>
          <Link
            className={`${classes.button} ${classes["edit-link"]}`}
            to={`/edit/${carId}?edit=${true}`}
          >
            Edit
          </Link>
          <Form method="POST">
            <input type="hidden" name="cancelRent" value={!data.available} />
            <button
              className={`${classes.button} ${classes["rent-button"]}`}
              type="submit"
            >
              {isSubmitting
                ? "Submitting"
                : data.available
                ? "Rent"
                : "Put Back"}
            </button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
