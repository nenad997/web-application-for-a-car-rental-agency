import React, { memo } from "react";
import { Form } from "react-router-dom";

import Input from "../ui/Input";
import classes from "./CarForm.module.css";

const fuelsString =
  "None, G-Drive Diesel, G-Drive 100, OPTI Diesel, OPTI Benzin 95, OPTI Auto Gas, Euro Diesel, Euro Premium BMB95, Metan CNG, Electrical Charger";

const CarForm = memo(() => {
  return (
    <Form className={classes.form}>
      <div className={classes.control}>
        <Input
          label="Vehicle Make"
          config={{
            type: "text",
            id: "make",
            name: "make",
            placeholder: "Enter vehicle make (Renault)",
          }}
        />
      </div>
      <div className={classes.control}>
        <Input
          label="Vehicle Model"
          config={{
            type: "text",
            id: "model",
            name: "model",
            placeholder: "Enter vehicle model (Clio 1.2)",
          }}
        />
      </div>
      <div className={classes.control}>
        <Input
          label="Registration number"
          config={{
            type: "text",
            id: "registration-number",
            name: "registration-number",
            placeholder: "Format (CC - 123 - AA)",
          }}
        />
      </div>
      <div className={classes.control}>
        <label className="text-label" htmlFor="more-info">
          More Info
        </label>
        <textarea
          name="moreInfo"
          id="more-info"
          placeholder="Enter more information about vehicle"
        ></textarea>
      </div>
      <div className={classes.control}>
        <Input
          label="Type of fuel"
          config={{
            id: "fuel",
            name: "fuel",
          }}
          options={fuelsString
            .split(",")
            .map((item) => item.trim().toUpperCase())}
          isSelect={true}
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
