import React, { useState } from "react";

import classes from "./Input.module.css";

const Input = ({ config, label, errorText, hasError }) => {
  const inputClasses = `${classes.input} ${
    hasError ? classes["error-input"] : undefined
  }`;

  return (
    <>
      <label className={classes.label} htmlFor={config.id}>
        {label}
      </label>
      <input className={inputClasses} {...config} />
      {hasError && <p className={classes.error}>{errorText}</p>}
    </>
  );
};

export default Input;

export const SelectInput = ({
  label,
  config,
  hasError,
  errorText,
  options = [],
}) => {
  const selectClasses = `${classes.select} ${
    hasError ? classes["error-input"] : undefined
  }`;

  return (
    <>
      <label className={classes.label} htmlFor={config.id}>
        {label}
      </label>
      <select className={selectClasses} {...config}>
        {options.length > 0 &&
          options.map((option, index) => (
            <option className={classes.option} value={option} key={index}>
              {option}
            </option>
          ))}
      </select>
      {hasError && <p className={classes.error}>{errorText}</p>}
    </>
  );
};

export const ImagePickerInput = ({ car }) => {
  const [imagePreview, setImagePreview] = useState(car?.image ?? null);

  const isNewImagePicked = imagePreview !== car?.image;

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setImagePreview(null);
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

    if (!allowedTypes.includes(file.type)) {
      alert("Please pick a valid picture format (JPEG, PNG, JPG, GIF).");
      event.target.value = "";
      setImagePreview(null);
      return;
    }

    setImagePreview(file);
  };

  return (
    <>
      {imagePreview && !isNewImagePicked && (
        <img
          src={`http://localhost:3000${imagePreview}`}
          alt="Car Preview"
          width="200"
        />
      )}
      <label className={classes.label} htmlFor="image">
        Pick Image
      </label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
      />
    </>
  );
};
