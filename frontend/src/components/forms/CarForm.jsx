import React, { memo } from "react";
import { Form, useActionData } from "react-router-dom";

import Input from "../ui/Input";
import classes from "./CarForm.module.css";

const fuelsString =
  "None, G-Drive Diesel, G-Drive 100, OPTI Diesel, OPTI Benzin 95, OPTI Auto Gas, Euro Diesel, Euro Premium BMB95, Metan CNG, Electrical Charger";

const CarForm = memo(({ method }) => {
  const actionData = useActionData();

  const isMakeInvalid = actionData?.errors?.find(
    (error) => error.path === "make"
  );
  const isModelInvalid = actionData?.errors?.find(
    (error) => error.path === "model"
  );
  const isImageURLInvalid = actionData?.errors?.find(
    (error) => error.path === "image"
  );
  const isPriceInvalid = actionData?.errors?.find(
    (error) => error.path === "price"
  );
  const isRegistrationNumberInvalid = actionData?.errors?.find(
    (error) => error.path === "reg_number"
  );
  const isDateInvalid = actionData?.errors?.find(
    (error) => error.path === "date"
  );
  const isFuelInvalid = actionData?.errors?.find(
    (error) => error.path === "fuel"
  );

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
          }}
          hasError={isMakeInvalid}
          errorText={isMakeInvalid?.message}
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
          }}
          hasError={isModelInvalid}
          errorText={isModelInvalid?.message}
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
          }}
          hasError={isImageURLInvalid}
          errorText={isImageURLInvalid?.message}
        />
      </div>
      <div className={classes.control}>
        <Input
          label="Price per day"
          config={{
            type: "text",
            id: "price",
            name: "price",
            placeholder: "Enter a vehicle price (per day)",
          }}
          hasError={isPriceInvalid}
          errorText={isDateInvalid?.message}
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
          }}
          hasError={isRegistrationNumberInvalid}
          errorText={isRegistrationNumberInvalid?.message}
        />
      </div>
      <div className={classes.control}>
        <Input
          label="Registration expiration date *"
          config={{
            type: "date",
            id: "reg-exp",
            name: "expiration",
          }}
          hasError={actionData?.errors?.find((error) => error.path === "date")}
          errorText={isDateInvalid?.message}
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
        ></textarea>
      </div>
      <div className={classes.control}>
        <Input
          label="Type of fuel *"
          config={{
            id: "fuel",
            name: "fuel",
          }}
          options={fuelsString
            .split(",")
            .map((item) => item.trim().toUpperCase())}
          isSelect={true}
          hasError={isFuelInvalid}
          errorText={isFuelInvalid?.message}
        />
      </div>
      <div className={classes.control}>
        <button className={classes["add-button"]} type="submit" title="Add">
          Add
        </button>
      </div>
    </Form>
  );
});

export default CarForm;
