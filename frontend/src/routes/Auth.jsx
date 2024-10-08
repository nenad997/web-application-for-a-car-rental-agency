import React from "react";
import { json, redirect, useRouteLoaderData } from "react-router-dom";

import AuthForm from "../components/user/AuthForm";
import Profile from "../components/user/Profile";
import {
  isEmailValid,
  isUsernameValid,
  isPasswordValid,
} from "../util/validator";
import {
  setAuthToken,
  removeAuthToken,
  setUserId,
  getUserId,
} from "../util/authorization";

const Auth = () => {
  const token = useRouteLoaderData("root");

  if (token) {
    return <Profile onRemoveAuthToken={removeAuthToken} userId={getUserId()} />;
  }

  return <AuthForm />;
};

export default Auth;

export async function action({ request }) {
  const formData = await request.formData();
  const { mode, ...entries } = Object.fromEntries(formData);

  const validationErrors = [];

  if (!isEmailValid(entries.email)) {
    validationErrors.push({ message: "Invalid email address", path: "email" });
  }

  if (!isPasswordValid(entries.password)) {
    validationErrors.push({
      message: "Invalid password. Minimum 8 characters of letters and numbers",
      path: "password",
    });
  }

  if (mode === "signup") {
    if (!isUsernameValid(entries.username)) {
      validationErrors.push({
        message:
          "Invalid user name (example: Username123). Use at least 5 characters",
        path: "user_name",
      });
    }

    if (!entries.id_card_number) {
      validationErrors.push({
        message: "Please enter id card number",
        path: "id_card_number",
      });
    }

    if (entries.password.toString() !== entries.repeat_password.toString()) {
      validationErrors.push({
        message: "Passwords do not match",
        path: "password",
      });
    }
  }

  if (validationErrors.length > 0) {
    return json(
      { message: "Validation failed", errors: validationErrors },
      { status: 403 }
    );
  }

  let redirectPath;

  if (mode === "signup") {
    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entries),
      });

      if (!response.ok) {
        return json(
          { message: "Invalid email or username or id card number" },
          { status: 409 }
        );
      }

      const responseData = await response.json();
    
      if (!responseData.id) {
        return json(
          { message: "Invalid email or username or id card number" },
          { status: 409 }
        );
      }
      alert("Registration successful");
      redirectPath = "/auth?mode=login";
    } catch (err) {
      return json(
        { message: err.message, field: err.path },
        { status: err.status }
      );
    }
  }

  if (mode === "login") {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: entries.email,
          password: entries.password,
        }),
      });

      if (!response.ok) {
        return json({ message: "Invalid email or password" }, { status: 401 });
      }

      const responseData = await response.json();

      if (!responseData?.userId) {
        return json({ message: "Invalid email or password" }, { status: 401 });
      }

      const token = responseData?.token;
      const userId = responseData?.userId;

      setAuthToken(token);
      setUserId(userId);

      redirectPath = "/";
    } catch (err) {
      return json({ message: err.message }, { status: err.status });
    }
  }

  return redirect(redirectPath);
}
