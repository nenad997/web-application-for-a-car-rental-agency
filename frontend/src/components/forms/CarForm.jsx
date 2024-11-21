import React, { memo, useState } from "react";
import {
  Form,
  useActionData,
  useNavigation,
  useParams,
} from "react-router-dom";

import Input, { Select, ImagePickerInput } from "../ui/Input";
import classes from "./CarForm.module.css";
import { getAuthToken } from "../../util/authorization";

const fuelsString =
  "None, G-Drive Diesel, G-Drive 100, OPTI Diesel, OPTI Benzin 95, OPTI Auto Gas, Euro Diesel, Euro Premium BMB95, Metan CNG, Electrical Charger";

const CarForm = memo(({ method, car }) => {
  const [error, setError] = useState();
  const actionData = useActionData();
  const navigation = useNavigation();
  const { carId } = useParams();

  const isSubmitting = navigation.state === "submitting";
  const token = getAuthToken();

  const deleteCarHandler = () => {
    if (!window.confirm("Are you sure?")) {
      return;
    }

    fetch(`http://localhost:3000/api/cars/${carId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          const error = new Error("Failed to delete car");
          error.status = 404;
          throw error;
        }
        location.href = "/";
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <Form
      className={classes.form}
      method={method}
      encType="multipart/form-data"
    >
      {error && <p className={classes.error}>{error}</p>}
      <div className={classes.control}>
        <Input
          label="Vehicle Make *"
          config={{
            type: "text",
            id: "make",
            name: "vehicleMake",
            placeholder: "Enter vehicle make (Renault)",
            defaultValue: car?.vehicleMake ?? "",
          }}
          hasError={actionData?.errors?.find((error) => error.path === "make")}
          errorText={
            actionData?.errors?.find((error) => error.path === "make")?.message
          }
        />
      </div>
      <div className={classes.control}>
        <Input
          label="Vehicle Model *"
          config={{
            type: "text",
            id: "model",
            name: "vehicleModel",
            placeholder: "Enter vehicle model (Clio 1.2)",
            defaultValue: car?.vehicleModel ?? "",
          }}
          hasError={actionData?.errors?.find((error) => error.path === "model")}
          errorText={
            actionData?.errors?.find((error) => error.path === "model")?.message
          }
        />
      </div>
      <div className={classes.control}>
        <ImagePickerInput />
      </div>
      <div className={classes.control}>
        <Input
          label="Price per day *"
          config={{
            type: "text",
            id: "price",
            name: "price",
            placeholder: "Enter a vehicle price (per day)",
            defaultValue: car?.price ?? "",
          }}
          hasError={actionData?.errors?.find((error) => error.path === "price")}
          errorText={
            actionData?.errors?.find((error) => error.path === "price")?.message
          }
        />
      </div>
      <div className={classes.control}>
        <Input
          label="Registration number *"
          config={{
            type: "text",
            id: "registration-number",
            name: "registrationNumber",
            placeholder: "Format (CC - 123 - AA)",
            defaultValue: car?.registrationNumber ?? "",
          }}
          hasError={actionData?.errors?.find(
            (error) => error.path === "reg_number"
          )}
          errorText={
            actionData?.errors?.find((error) => error.path === "reg_number")
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
            name: "regExpiration",
            defaultValue: car?.regExpiration.split("T")[0] ?? "",
          }}
          hasError={actionData?.errors?.find((error) => error.path === "date")}
          errorText={
            actionData?.errors?.find((error) => error.path === "date")?.message
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
          defaultValue={car?.moreInfo ?? ""}
        ></textarea>
      </div>
      <div className={classes.control}>
        <Select
          label="Type of fuel *"
          config={{
            type: "text",
            id: "fuel",
            name: "fuel",
            defaultValue: car?.fuel ?? "",
          }}
          options={fuelsString
            .split(",")
            .map((item) => item.trim().toUpperCase())}
          hasError={actionData?.errors?.find((error) => error.path === "fuel")}
          errorText={
            actionData?.errors?.find((error) => error.path === "fuel")?.message
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
        {car && (
          <button
            className={`${classes.button} ${classes["delete-button"]}`}
            type="button"
            title="Confirm"
            onClick={deleteCarHandler}
          >
            Delete
          </button>
        )}
      </div>
      <p className="text">* REQUIRED FIELDS</p>
    </Form>
  );
});

export default CarForm;
