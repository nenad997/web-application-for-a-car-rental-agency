import React, { useState } from "react";

import classes from "./Input.module.css";

const ImagePickerInput = ({ currentImage }) => {
  const [imagePreview, setImagePreview] = useState(currentImage);

  const isNewImagePicked = imagePreview !== currentImage;

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file || file.size === 0) {
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
        <>
          <input type="hidden" name="imagePreview" value={imagePreview} />
          <img
            src={`http://localhost:3000${imagePreview}`}
            alt="Car Preview"
            width="200"
          />
        </>
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

export default ImagePickerInput;
