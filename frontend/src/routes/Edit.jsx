import { useEffect } from "react";
import { json, redirect, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CarForm from "../components/car/CarForm";
import { isRegistrationNumberValid, isDateValid } from "../util/validator";
import { getAuthToken } from "../util/authorization";
import { selectFeedState } from "../store";
import { fetchCarById } from "../store/slices/feed-slice";

const Edit = () => {
  const { carId } = useParams();
  const dispatch = useDispatch();
  const { selectedCar, isLoading } = useSelector(selectFeedState);

  useEffect(() => {
    dispatch(fetchCarById(carId));
  }, [carId]);

  if (isLoading || !selectedCar) {
    return <p>Loading...</p>;
  }

  return <CarForm method="PUT" car={selectedCar} />;
};

export default Edit;

export async function loader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  return null;
}

export async function action({ params, request }) {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  const { carId } = params;
  const formData = await request.formData();
  const entries = Object.fromEntries(formData);

  const pickedImage = formData.get("image");
  const currentImage = formData.get("imagePreview");

  const validationErrors = [];

  if (!entries.vehicleMake) {
    validationErrors.push({
      message: "Vehicle make property must be set",
      path: "make",
    });
  }

  if (!entries.vehicleModel) {
    validationErrors.push({
      message: "Vehicle model property must be set",
      path: "model",
    });
  }

  if ((!pickedImage || pickedImage.size === 0) && !currentImage) {
    validationErrors.push({
      message: "Please select an image",
      path: "image",
    });
  }

  if (!entries.price || isNaN(entries.price) || +entries.price < 0) {
    validationErrors.push({
      message: "Invalid price entered",
      path: "price",
    });
  }

  if (!isRegistrationNumberValid(entries.registrationNumber)) {
    validationErrors.push({
      message: "The value you provided is not a valid registration number",
      path: "reg_number",
    });
  }

  if (!isDateValid(entries.regExpiration)) {
    validationErrors.push({
      message: "Invalid date provided",
      path: "date",
    });
  }

  if (entries.fuel.toString() === "NONE") {
    validationErrors.push({
      message: "Fuel property should not be NONE",
      path: "fuel",
    });
  }

  if (validationErrors.length > 0) {
    return json(
      { message: "Validation failed!", errors: validationErrors },
      { status: 403 }
    );
  }

  try {
    const response = await fetch(`http://localhost:3000/api/cars/${carId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      return { message: errorData?.message, serverPath: errorData.serverPath };
    }

    return redirect("/?limit=2");
  } catch (err) {
    return json(
      { message: err.message || "An Error Occurred!" },
      { status: err.status || 500 }
    );
  }
}
