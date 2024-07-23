import React, { memo } from "react";
import {
  Form,
  useActionData,
  useNavigation,
  useParams,
} from "react-router-dom";

import Input from "../ui/Input";
import classes from "./CarForm.module.css";

const fuelsString =
  "None, G-Drive Diesel, G-Drive 100, OPTI Diesel, OPTI Benzin 95, OPTI Auto Gas, Euro Diesel, Euro Premium BMB95, Metan CNG, Electrical Charger";

const CarForm = memo(({ method, car = null }) => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { carId } = useParams();

  const deleteCarHandler = () => {
    fetch(`http://localhost:3000/car/${carId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          const error = new Error("Failed to delete car");
          error.status = 404;
          throw error;
        }
        return res;
      })
      .then((resData) => {
        location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Form className={classes.form} method={method}>
      <div className={classes.control}>
        <Input
          label="Vehicle Make *"
          config={{
            type: "text",
            id: "make",
            name: "make",
            placeholder: "Enter vehicle make (Renault)",
            defaultValue: car ? car.vehicleMake : null,
          }}
          hasError={actionData?.errors.find((error) => error.path === "make")}
          errorText={
            actionData?.errors.find((error) => error.path === "make")?.message
          }
        />
      </div>
      <div className={classes.control}>
        <Input
          label="Vehicle Model *"
          config={{
            type: "text",
            id: "model",
            name: "model",
            placeholder: "Enter vehicle model (Clio 1.2)",
            defaultValue: car ? car.vehicleModel : null,
          }}
          hasError={actionData?.errors.find((error) => error.path === "model")}
          errorText={
            actionData?.errors.find((error) => error.path === "model")?.message
          }
        />
      </div>
      <div className={classes.control}>
        <Input
          label="Image URL *"
          config={{
            type: "url",
            id: "image",
            name: "image",
            placeholder: "http://www.imageUrl.com",
            defaultValue: car ? car.imageUrl : null,
          }}
          hasError={actionData?.errors.find((error) => error.path === "image")}
          errorText={
            actionData?.errors.find((error) => error.path === "image")?.message
          }
        />
      </div>
      <div className={classes.control}>
        <Input
          label="Price per day *"
          config={{
            type: "text",
            id: "price",
            name: "price",
            placeholder: "Enter a vehicle price (per day)",
            defaultValue: car ? car.price : null,
          }}
          hasError={actionData?.errors.find((error) => error.path === "price")}
          errorText={
            actionData?.errors.find((error) => error.path === "price")?.message
          }
        />
      </div>
      <div className={classes.control}>
        <Input
          label="Registration number *"
          config={{
            type: "text",
            id: "registration-number",
            name: "registration_number",
            placeholder: "Format (CC - 123 - AA)",
            defaultValue: car ? car.registrationNumber : null,
          }}
          hasError={actionData?.errors.find(
            (error) => error.path === "reg_number"
          )}
          errorText={
            actionData?.errors.find((error) => error.path === "reg_number")
              ?.message
          }
        />
      </div>
      <div className={classes.control}>
        <Input
          label="Registration expiration date *"
          config={{
            type: "date",
            id: "reg-exp",
            name: "expiration",
            defaultValue: car ? car.regExpiration.split("T")[0] : null,
          }}
          hasError={actionData?.errors.find((error) => error.path === "date")}
          errorText={
            actionData?.errors.find((error) => error.path === "date")?.message
          }
        />
      </div>
      <div className={classes.control}>
        <label className="text-label" htmlFor="more-info">
          More Info {"(optional)"}
        </label>
        <textarea
          name="moreInfo"
          id="more-info"
          placeholder="Enter more information about vehicle"
          defaultValue={car ? car.moreInfo : null}
        ></textarea>
      </div>
      <div className={classes.control}>
        <Input
          label="Type of fuel *"
          config={{
            type: "text",
            id: "fuel",
            name: "fuel",
            defaultValue: car ? car.fuel : null,
          }}
          options={fuelsString
            .split(",")
            .map((item) => item.trim().toUpperCase())}
          isSelect={true}
          hasError={actionData?.errors.find((error) => error.path === "fuel")}
          errorText={
            actionData?.errors.find((error) => error.path === "fuel")?.message
          }
        />
      </div>
      <div className={classes.control}>
        <button
          className={`${classes.button} ${classes["add-button"]}`}
          type="submit"
          title="Confirm"
        >
          {isSubmitting ? "Submitting" : !car ? "Add" : "Edit"}
        </button>
        <button
          className={`${classes.button} ${classes["delete-button"]}`}
          type="button"
          onClick={deleteCarHandler}
        >
          Delete
        </button>
      </div>
      <p className="text">* REQUIRED FIELDS</p>
    </Form>
  );
});

export default CarForm;
