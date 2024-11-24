import React from "react";
import {
  Form,
  useSearchParams,
  Link,
  useActionData,
  useNavigation,
} from "react-router-dom";

import classes from "./AuthForm.module.css";
import Input from "../ui/Input";
import { filterError } from "../../util/error-filter";

const AuthForm = ({ user }) => {
  const [searchParams] = useSearchParams();
  const actionData = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const mode = searchParams.get("mode") || "signup";
  const submitButtonText = isSubmitting
    ? "Submitting..."
    : mode === "login"
    ? "Sign in"
    : "Signup";

  let actions = (
    <>
      <input type="hidden" name="mode" value={mode} />
      <div className={classes.control}>
        <button
          className={`${classes.button} ${classes["auth-button"]} ${
            isSubmitting ? classes.disabled : ""
          }`}
          title={submitButtonText}
          type="submit"
          disabled={isSubmitting}
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

  if (user?._id) {
    actions = (
      <>
        <input type="hidden" name="uId" value={user?._id.toString() ?? ""} />
        <div className={classes.control}>
          <button
            className={`${classes.button} ${classes["auth-button"]} ${
              isSubmitting ? classes.disabled : ""
            }`}
            title="Edit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Edit"}
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

  const errors = {
    emailErr: filterError(actionData?.errors, "email"),
    user_nameErr: filterError(actionData?.errors, "user_name"),
    id_card_numberErr: filterError(actionData?.errors, "id_card_number"),
    passwordErr: filterError(actionData?.errors, "password"),
  };

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
          hasError={errors.emailErr}
          errorText={errors.emailErr?.message}
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
              hasError={errors.user_nameErr}
              errorText={errors.user_nameErr?.message}
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
              hasError={errors.id_card_numberErr}
              errorText={errors.id_card_numberErr?.message}
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
          hasError={errors.passwordErr}
          errorText={errors.passwordErr?.message}
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
            hasError={errors.passwordErr}
            errorText={errors.passwordErr?.message}
          />
        </div>
      )}
      {actions}
    </Form>
  );
};

export default AuthForm;
