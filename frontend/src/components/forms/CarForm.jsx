import React, { memo, useState } from "react";
import {
  Form,
  useActionData,
  useNavigation,
  useParams,
  Link,
} from "react-router-dom";

import classes from "./CarForm.module.css";
import Input, { SelectInput } from "../ui/Input";
import ImagePickerInput from "../ui/ImagePicker";
import { getAuthToken } from "../../util/authorization";
import { filterError } from "../../util/error-filter";

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

  const errors = {
    makeErr: filterError(actionData?.errors, "make"),
    modelErr: filterError(actionData?.errors, "model"),
    imageErr: filterError(actionData?.errors, "image"),
    priceErr: filterError(actionData?.errors, "price"),
    regErr: filterError(actionData?.errors, "reg_number"),
    dateErr: filterError(actionData?.errors, "date"),
    fuelErr: filterError(actionData?.errors, "fuel"),
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
          hasError={errors.makeErr}
          errorText={errors.makeErr?.message}
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
          hasError={errors.modelErr}
          errorText={errors.modelErr?.message}
        />
      </div>
      <div className={classes.control}>
        <ImagePickerInput
          currentImage={car?.image ?? null}
          hasError={errors.imageErr}
          errorText={errors.imageErr?.message}
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
            defaultValue: car?.price ?? "",
          }}
          hasError={errors.priceErr}
          errorText={errors.priceErr?.message}
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
          hasError={errors.regErr}
          errorText={errors.regErr?.message}
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
          hasError={errors.dateErr}
          errorText={errors.dateErr?.message}
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
        />
      </div>
      <div className={classes.control}>
        <SelectInput
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
          hasError={errors.fuelErr}
          errorText={errors.fuelErr?.message}
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
        <Link
          to=".."
          className={`${classes.button} ${classes["cancel-button"]}`}
          title="Cancel"
        >
          Cancel
        </Link>
        {car && (
          <button
            className={`${classes.button} ${classes["delete-button"]}`}
            type="button"
            title="Delete"
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
