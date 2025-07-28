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
    <section
      className={`${classes.item} ${
        data.available ? classes.available : classes.unavailable
      }`}
    >
      <header className={classes.header}>
        <h2>
          {data.vehicleMake} - {data.vehicleModel}
        </h2>
      </header>

      <figure className={classes.figure}>
        <img
          className={classes.image}
          src={`http://localhost:3000${data.image}`}
          alt={data.vehicleMake}
        />
      </figure>

      <div className={classes.info}>
        <details className={classes.details}>
          <summary>Details</summary>
          <p>Fuel: {data.fuel}</p>
          <p className={classes.priceTag}>
            Price: <strong>{data.price} € / day</strong>
          </p>
          <p>More: {data.moreInfo}</p>
        </details>
      </div>

      {token && (
        <footer className={classes.actions}>
          <Link
            className={`${classes.button} ${classes.edit}`}
            to={`/edit/${carId}`}
          >
            Edit
          </Link>
          <Form method="POST">
            <input type="hidden" name="cancelRent" value={!data.available} />
            <button
              className={`${classes.button} ${classes.rent}`}
              type="submit"
            >
              {isSubmitting
                ? "Submitting..."
                : data.available
                ? "Rent"
                : "Put Back"}
            </button>
          </Form>
        </footer>
      )}
    </section>
  );
};

export default CarDetails;
