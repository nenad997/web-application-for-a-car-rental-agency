import React from "react";
import { Form, useSearchParams, Link, useActionData } from "react-router-dom";

import classes from "./AuthForm.module.css";
import { getUserId } from "../../util/authorization";
import Input from "../ui/Input";

const AuthForm = ({ user }) => {
  const [searchParams] = useSearchParams();
  const actionData = useActionData();

  const isUserLoggedIn = Boolean(getUserId());

  const mode = searchParams.get("mode") || "signup";
  const submitButtonText = mode === "login" ? "Sign in" : "Signup";

  let actions = (
    <>
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
    </>
  );

  if (isUserLoggedIn) {
    actions = (
      <>
        <input type="hidden" name="uId" value={user?._id.toString() ?? ""} />
        <div className={classes.control}>
          <button
            className={`${classes.button} ${classes["auth-button"]}`}
            title="Edit"
            type="submit"
          >
            Edit
          </button>
          <Link
            className={`${classes.button} ${classes["cancel-button"]}`}
            to="/profile"
          >
            Cancel
          </Link>
        </div>
      </>
    );
  }

  return (
    <Form method="POST" className={classes.form}>
      <div className={classes.control}>
        <Input
          label="Email address *"
          config={{
            type: "email",
            id: "email",
            name: "email",
            placeholder: "Enter your email address",
            defaultValue: user?.email ?? "",
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
                name: "username",
                placeholder: "Enter user name",
                defaultValue: user?.username ?? "",
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
                defaultValue: user?.id_card_number ?? "",
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
      {actions}
    </Form>
  );
};

export default AuthForm;
