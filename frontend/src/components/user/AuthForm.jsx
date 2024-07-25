import React, { useEffect, useState } from "react";
import {
  Form,
  useSearchParams,
  useNavigate,
  Link,
  useActionData,
} from "react-router-dom";

import classes from "./AuthForm.module.css";
import Input from "../ui/Input";

const AuthForm = () => {
  const [error, setError] = useState();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const actionData = useActionData();

  const mode = searchParams.get("mode") || "signup";
  const submitButtonText = mode === "login" ? "Sign in" : "Signup";

  const closeErrorTextHandler = () => {
    setError(null);
  };

  useEffect(() => {
    if (mode !== "login" && mode !== "signup") {
      navigate("?mode=login");
    }
  }, [mode, navigate]);

  useEffect(() => {
    setError(actionData);
  }, [setError, actionData]);

  return (
    <Form method="POST" className={classes.form}>
      {error?.message && (
        <p className={classes.error} onClick={closeErrorTextHandler}>
          {error?.message}
        </p>
      )}
      <div className={classes.control}>
        <Input
          label="Email address *"
          config={{
            type: "email",
            id: "email",
            name: "email",
            placeholder: "Enter your email address",
          }}
          hasError={actionData?.errors?.find((error) => error.path === "email")}
          errorText={
            actionData?.errors?.find((error) => error.path === "email")?.message
          }
        />
      </div>
      {mode === "signup" && (
        <>
          <div className={classes.control}>
            <Input
              label="User name *"
              config={{
                type: "text",
                id: "user_name",
                name: "user_name",
                placeholder: "Enter user name",
              }}
              hasError={actionData?.errors?.find(
                (error) => error.path === "user_name"
              )}
              errorText={
                actionData?.errors?.find((error) => error.path === "user_name")
                  ?.message
              }
            />
          </div>
          <div className={classes.control}>
            <Input
              label="ID card number *"
              config={{
                type: "text",
                id: "id_card_number",
                name: "id_card_number",
                placeholder: "Enter your ID card number",
              }}
              hasError={actionData?.errors?.find(
                (error) => error.path === "id_card_number"
              )}
              errorText={
                actionData?.errors?.find(
                  (error) => error.path === "id_card_number"
                )?.message
              }
            />
          </div>
        </>
      )}
      <div className={classes.control}>
        <Input
          label="Password *"
          config={{
            type: "password",
            id: "password",
            name: "password",
            placeholder: "Enter your password",
          }}
          hasError={actionData?.errors?.find(
            (error) => error.path === "password"
          )}
          errorText={
            actionData?.errors?.find((error) => error.path === "password")
              ?.message
          }
        />
      </div>
      {mode === "signup" && (
        <div className={classes.control}>
          <Input
            label="Repeat password *"
            config={{
              type: "password",
              id: "repeat_password",
              name: "repeat_password",
              placeholder: "Repeat your password",
            }}
            hasError={actionData?.errors?.find(
              (error) => error.path === "password"
            )}
            errorText={
              actionData?.errors?.find((error) => error.path === "password")
                ?.message
            }
          />
        </div>
      )}
      <input type="hidden" name="mode" value={mode} />
      <div className={classes.control}>
        <button
          className={`${classes.button} ${classes["auth-button"]}`}
          title={submitButtonText}
          type="submit"
        >
          {submitButtonText}
        </button>
        <Link
          className={`${classes.button} ${classes["switch-mode"]}`}
          to={`?mode=${mode === "login" ? "signup" : "login"}`}
        >
          {mode === "login" ? "Register" : "Log in"}
        </Link>
      </div>
    </Form>
  );
};

export default AuthForm;
