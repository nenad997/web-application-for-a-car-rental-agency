import { useEffect } from "react";
import {
  useLoaderData,
  Link,
  useParams,
  useRouteLoaderData,
  Form,
  useNavigation,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./CarDetails.module.css";
import PickUser from "../ui/PickUser";
import { fetchUsers } from "../../store/slices/user-slice";

const CarDetails = () => {
  const { carId } = useParams();
  const loaderData = useLoaderData();
  const token = useRouteLoaderData("root");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const data = loaderData?.data ? loaderData.data : null;

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

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
        <>
          <footer className={classes.actions}>
            <p className={classes.center}>
              <Link
                className={`${classes.button} ${classes.edit}`}
                to={`/edit/${carId}`}
              >
                Edit
              </Link>
            </p>
            <Form method="POST" className={classes.form}>
              <input type="hidden" name="cancelRent" value={!data.available} />
              <div className={classes.center}>
                <PickUser />
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
              </div>
            </Form>
          </footer>
        </>
      )}
    </section>
  );
};

export default CarDetails;
