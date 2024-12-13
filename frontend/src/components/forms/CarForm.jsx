import React, { memo } from "react";
import {
  Form,
  useActionData,
  useNavigation,
  useParams,
  Link,
  useNavigate,
  useRevalidator,
} from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer } from "react-toastify";

import classes from "./CarForm.module.css";
import Input, { SelectInput } from "../ui/Input";
import ImagePickerInput from "../ui/ImagePicker";
import { getAuthToken } from "../../util/authorization";
import { filterError } from "../../util/error-filter";
import { generateToast } from "../../util/toastify";

const fuelsString =
  "None, G-Drive Diesel, G-Drive 100, OPTI Diesel, OPTI Benzin 95, OPTI Auto Gas, Euro Diesel, Euro Premium BMB95, Metan CNG, Electrical Charger";

const CarForm = memo(({ method, car }) => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const { carId } = useParams();
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const isSubmitting = navigation.state === "submitting";
  const token = getAuthToken();

  const deleteCarHandler = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/cars/${carId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete car!");
      }

      await response.json();

      navigate("/");
      revalidator.revalidate();
    } catch (err) {
      generateToast(err.message, {
        color: "red",
      });
    }
  };

  const confirmDeletion = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure?",
      overlayClassName: classes.overlay,
      buttons: [
        {
          label: "Delete",
          className: classes["btn-confirm"],
          onClick: deleteCarHandler,
        },
        {
          label: "Cancel",
          className: classes["btn-cancel"],
          onClick: () => navigate("."),
        },
      ],
      closeOnEscape: true,
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
    <>
      <ToastContainer />
      <Form
        className={classes.form}
        method={method}
        encType="multipart/form-data"
      >
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
            image={car?.image ?? null}
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
            onServerErr={() => {
              if (actionData?.serverPath === "regNumber") {
                return actionData?.message;
              }
              return null;
            }}
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
          {car && (
            <button
              className={`${classes.button} ${classes["delete-button"]}`}
              type="button"
              title="Delete"
              onClick={confirmDeletion}
            >
              Delete
            </button>
          )}
          <Link
            to=".."
            className={`${classes.button} ${classes["cancel-button"]}`}
            title="Cancel"
          >
            Cancel
          </Link>
        </div>
        <p className="text">* REQUIRED FIELDS</p>
      </Form>
    </>
  );
});

export default CarForm;
