import React, { useEffect } from "react";
import { json, redirect, useActionData } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AuthForm from "../components/forms/AuthForm";
import {
  isEmailValid,
  isUsernameValid,
  isPasswordValid,
} from "../util/validator";
import { setAuthToken, setUserId, getUserId } from "../util/authorization";
import { generateToast } from "../util/toastify";

const Auth = () => {
  const actionData = useActionData();

  useEffect(() => {
    generateToast(actionData?.message);
  }, [actionData?.message]);

  return (
    <>
      <ToastContainer />
      <AuthForm />
    </>
  );
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

  if (mode === "signup") {
    try {
      const response = await fetch("http://localhost:3000/api/user/signup", {
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

      return redirect("/auth?mode=login");
    } catch (err) {
      return json(
        { message: err.message, field: err.path },
        { status: err.status }
      );
    }
  }

  if (mode === "login") {
    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
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
        throw new Error("Invalid email address or password, try again");
      }

      const responseData = await response.json();

      const token = responseData?.token;
      const userId = responseData?.userId;

      if (!token || !userId) {
        return json(
          {
            message: "Invalid email address or password, try again",
          },
          { status: 401 }
        );
      }

      setAuthToken(token);
      setUserId(userId);

      return redirect("/?auth=login");
    } catch (err) {
      return json({ message: err.message }, { status: err.status });
    }
  }

  return null;
}

export function loader({ request }) {
  const userId = getUserId();

  if (userId) {
    return redirect("/profile");
  }

  const { url } = request;

  const regex = /[?&]mode=([^&\s]+)/;
  const match = url.match(regex);
  const mode = Boolean(match) ? match[1] : undefined;

  if (!mode || (mode !== "login" && mode !== "signup")) {
    return redirect("/auth?mode=login");
  }

  return null;
}
