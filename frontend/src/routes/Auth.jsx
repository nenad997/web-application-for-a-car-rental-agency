import React from "react";
import { json, redirect } from "react-router-dom";

import AuthForm from "../components/user/AuthForm";
import {
  isEmailValid,
  isUsernameValid,
  isPasswordValid,
} from "../util/validator";

const Auth = () => {
  return <AuthForm />;
};

export default Auth;

export async function action({ request }) {
  const formData = await request.formData();
  const entries = Object.fromEntries(formData);
  const { email, user_name, id_card_number, password, repeat_password, mode } =
    Object.fromEntries(formData);

  const validationErrors = [];

  if (!isEmailValid(email)) {
    validationErrors.push({ message: "Invalid email address", path: "email" });
  }

  if (!isPasswordValid(password)) {
    validationErrors.push({
      message: "Invalid password. Minimum 8 characters of letters and numbers",
      path: "password",
    });
  }

  if (mode === "signup") {
    if (!isUsernameValid(user_name)) {
      validationErrors.push({
        message:
          "Invalid user name (example: Username123). Use at least 5 characters",
        path: "user_name",
      });
    }

    if (!id_card_number) {
      validationErrors.push({
        message: "Please enter id card number",
        path: "id_card_number",
      });
    }

    if (password.toString() !== repeat_password.toString()) {
      validationErrors.push({
        message: "Passwords do not match",
        path: "password",
      });
    }
  }

  if (validationErrors.length > 0) {
    console.log(validationErrors);
    return json(
      { message: "Validation failed", errors: validationErrors },
      { status: 403 }
    );
  }

  let redirectPath;

  if (mode === "signup") {
    try {
      const response = await fetch("http://localhost:3000/auth/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          user_name,
          id_card_number,
          password,
          repeat_password,
        }),
      });

      if (!response.ok) {
        return json(
          { message: "User with this email address already exists" },
          { status: 409 }
        );
      }

      const responseData = await response.json();

      if (!responseData?.data.id) {
        return json(
          { message: "User with this email address already exists" },
          { status: 409 }
        );
      }

      redirectPath = "/";
    } catch (err) {
      return json({ message: err.message }, { status: err.status });
    }
  }

  return redirect(redirectPath);
}
