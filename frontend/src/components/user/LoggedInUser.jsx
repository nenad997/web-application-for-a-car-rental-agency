import React from "react";
import { createPortal } from "react-dom";
import { json, useRouteLoaderData, redirect } from "react-router-dom";

import Modal from "../ui/Modal";
import AuthForm from "../forms/AuthForm";
import {
  isEmailValid,
  isPasswordValid,
  isUsernameValid,
} from "../../util/validator";

const LoggedInUser = () => {
  const user = useRouteLoaderData("profile-root");

  const portal = createPortal(
    <Modal>
      <AuthForm user={user} />
    </Modal>,
    document.getElementById("modal")
  );

  return portal;
};

export default LoggedInUser;

export async function action({ request }) {
  const formData = await request.formData();
  const { uId, ...inputs } = Object.fromEntries(formData);

  const validationErrors = [];

  if (!isEmailValid(inputs.email)) {
    validationErrors.push({ message: "Invalid email address", path: "email" });
  }

  if (!isPasswordValid(inputs.password)) {
    validationErrors.push({
      message: "Invalid password. Minimum 8 characters of letters and numbers",
      path: "password",
    });
  }

  if (!isUsernameValid(inputs.username)) {
    validationErrors.push({
      message:
        "Invalid user name (example: Username123). Use at least 5 characters",
      path: "user_name",
    });
  }

  if (!inputs.id_card_number) {
    validationErrors.push({
      message: "Please enter id card number",
      path: "id_card_number",
    });
  }

  if (inputs.password.toString() !== inputs.repeat_password.toString()) {
    validationErrors.push({
      message: "Passwords do not match",
      path: "password",
    });
  }

  if (validationErrors.length > 0) {
    return json(
      { message: "Validation failed", errors: validationErrors },
      { status: 403 }
    );
  }

  try {
    const response = await fetch(`http://localhost:3000/api/user/${uId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user, please try again later");
    }

    await response.json();

    return redirect("/profile");
  } catch (err) {
    return json(
      { message: err.message },
      {
        status: 422,
      }
    );
  }
}
