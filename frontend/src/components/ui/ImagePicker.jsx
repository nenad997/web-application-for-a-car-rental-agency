import React, { useState, useRef } from "react";
import { ToastContainer } from "react-toastify";

import classes from "./ImagePicker.module.css";
import Input from "./Input";
import { generateToast } from "../../util/toastify";

const ImagePickerInput = ({ image, hasError, errorText }) => {
  const [loadedImagePreview, setLoadedImagePreview] = useState(image);
  const [pickedImage, setPickedImage] = useState();
  const fileInputRef = useRef();

  const isNewImagePicked = loadedImagePreview !== image;

  const openFileInputHandler = () => {
    if (fileInputRef?.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file || file.size === 0) {
      setLoadedImagePreview(null);
      setPickedImage(null);
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

    if (!allowedTypes.includes(file.type)) {
      generateToast(
        "Please pick a valid picture format (JPEG, PNG, JPG, GIF).",
        {
          color: "red",
        }
      );
      event.target.value = "";
      setLoadedImagePreview((currentImage) => currentImage);
      setPickedImage(null);
      return;
    }

    setLoadedImagePreview(file);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      setPickedImage(event.target.result);
    };
  };

  let imagePreviewContent;

  if (loadedImagePreview && !isNewImagePicked) {
    imagePreviewContent = (
      <>
        <input type="hidden" name="imagePreview" value={loadedImagePreview} />
        <img
          src={`http://localhost:3000${loadedImagePreview}`}
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
      <ToastContainer />
      {imagePreviewContent}
      <div className={classes.picker}>
        <button type="button" onClick={openFileInputHandler}>
          Upload Image
        </button>
        <Input
          config={{
            type: "file",
            id: "image",
            name: "image",
            accept: "image/*",
            onChange: handleFileChange,
          }}
          ref={fileInputRef}
          hasError={hasError}
          errorText={errorText}
        />
      </div>
    </>
  );
};

export default ImagePickerInput;
