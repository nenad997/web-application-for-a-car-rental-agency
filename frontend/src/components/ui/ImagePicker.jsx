import React, { useState, useRef } from "react";

import classes from "./Input.module.css";

const ImagePickerInput = ({ currentImage, hasError, errorText }) => {
  const [imagePreview, setImagePreview] = useState(currentImage);
  const [pickedImage, setPickedImage] = useState();
  const fileInputRef = useRef();

  const isNewImagePicked = imagePreview !== currentImage;

  const openFileInputHandler = () => {
    if (fileInputRef?.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file || file.size === 0) {
      setImagePreview(null);
      setPickedImage(null);
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

    if (!allowedTypes.includes(file.type)) {
      alert("Please pick a valid picture format (JPEG, PNG, JPG, GIF).");
      event.target.value = "";
      setImagePreview(null);
      setPickedImage(null);
      return;
    }

    setImagePreview(file);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      setPickedImage(event.target.result);
    };
  };

  let imagePreviewContent;

  if (imagePreview && !isNewImagePicked) {
    imagePreviewContent = (
      <>
        <input type="hidden" name="imagePreview" value={imagePreview} />
        <img
          src={`http://localhost:3000${imagePreview}`}
          alt="Car Preview"
          width="200"
        />
      </>
    );
  }

  if (pickedImage && isNewImagePicked) {
    imagePreviewContent = (
      <img src={pickedImage} alt="Car Preview" width="200" />
    );
  }

  return (
    <>
      {imagePreviewContent}
      <div className={classes.actions}>
        <button type="button" onClick={openFileInputHandler}>
          Upload Image
        </button>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </div>
      {hasError && <p className={classes.error}>{errorText}</p>}
    </>
  );
};

export default ImagePickerInput;
