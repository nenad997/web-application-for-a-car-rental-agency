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
          hasError={filterError(actionData?.errors, "make")}
          errorText={filterError(actionData?.errors, "make")?.message}
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
          hasError={filterError(actionData?.errors, "model")}
          errorText={filterError(actionData?.errors, "model")?.message}
        />
      </div>
      <div className={classes.control}>
        <ImagePickerInput
          currentImage={car?.image ?? null}
          hasError={filterError(actionData?.errors, "image")}
          errorText={filterError(actionData?.errors, "image")?.message}
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
          hasError={filterError(actionData?.errors, "price")}
          errorText={filterError(actionData?.errors, "price")?.message}
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
          hasError={filterError(actionData?.errors, "reg_number")}
          errorText={filterError(actionData?.errors, "reg_number")?.message}
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
          hasError={filterError(actionData?.errors, "date")}
          errorText={filterError(actionData?.errors, "date")?.message}
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
          hasError={filterError(actionData?.errors, "fuel")}
          errorText={filterError(actionData?.errors, "fuel")?.message}
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
