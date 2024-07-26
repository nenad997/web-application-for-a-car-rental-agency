import React, { useState } from "react";

import Input from "../ui/Input";
import classes from "./UserForm.module.css";
import {
  isEmailValid,
  isUsernameValid,
  isPasswordValid,
} from "../../util/validator";

const UserForm = ({ onCloseModal }) => {
  const initialInputs = {
    email: "",
    user_name: "",
    id_card_number: "",
    password: "",
    repeat_password: "",
  };
  const initialTouch = {
    email: false,
    user_name: false,
    id_card_number: false,
    password: false,
    repeat_password: false,
  };
  const [inputs, setInputs] = useState(initialInputs);
  const [isTouched, setIsTouched] = useState(initialTouch);

  const changeInputHandler = (event) => {
    const { name, value } = event.target;
    setInputs((curInputs) => ({
      ...curInputs,
      [name]: value,
    }));
  };

  const blurInputHandler = (event) => {
    const name = event.target.name;
    setIsTouched((curTouch) => ({
      ...curTouch,
      [name]: true,
    }));
  };

  const isEmailInvalid = !isEmailValid(inputs.email) && isTouched.email;
  const isUsernameInvalid =
    !isUsernameValid(inputs.user_name) && isTouched.user_name;
  const isIdCardNumberInvalid =
    !inputs.id_card_number && isTouched.id_card_number;
  const isPasswordInvalid =
    !isPasswordValid(inputs.password) && isTouched.password;
  const doPasswordsMatch =
    inputs.password.toString() === inputs.repeat_password.toString();

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (
      isEmailInvalid ||
      isUsernameInvalid ||
      isIdCardNumberInvalid ||
      isPasswordInvalid ||
      !doPasswordsMatch
    ) {
      alert("Validation failed");
      return;
    }

    console.log("Submitted");
    console.log(inputs);
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <Input
          label="Email address *"
          config={{
            type: "email",
            id: "email",
            name: "email",
            placeholder: "Enter your email address",
            onBlur: blurInputHandler,
            onChange: changeInputHandler,
            value: inputs.email,
          }}
          hasError={isEmailInvalid}
          errorText="Invalid email address"
        />
      </div>
      <div className={classes.control}>
        <Input
          label="User name *"
          config={{
            type: "text",
            id: "user_name",
            name: "user_name",
            placeholder: "Enter user name",
            onBlur: blurInputHandler,
            onChange: changeInputHandler,
            value: inputs.user_name,
          }}
          hasError={isUsernameInvalid}
          errorText="Invalid user name (example: Username123). Use at least 5 characters"
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
            onBlur: blurInputHandler,
            onChange: changeInputHandler,
            value: inputs.id_card_number,
          }}
          hasError={isIdCardNumberInvalid}
          errorText="Please enter id card number"
        />
      </div>
      <div className={classes.control}>
        <Input
          label="Password *"
          config={{
            type: "password",
            id: "password",
            name: "password",
            placeholder: "Enter your password",
            onBlur: blurInputHandler,
            onChange: changeInputHandler,
            value: inputs.password,
          }}
          hasError={isPasswordInvalid || !doPasswordsMatch}
          errorText={
            !doPasswordsMatch
              ? "Passwords do not match"
              : "Invalid password. Minimum 8 characters of letters and numbers"
          }
        />
      </div>
      <div className={classes.control}>
        <Input
          label="Repeat password *"
          config={{
            type: "password",
            id: "repeat_password",
            name: "repeat_password",
            placeholder: "Repeat your password",
            onBlur: blurInputHandler,
            onChange: changeInputHandler,
            value: inputs.repeat_password,
          }}
          hasError={isPasswordInvalid || !doPasswordsMatch}
          errorText={
            !doPasswordsMatch
              ? "Passwords do not match"
              : "Invalid password. Minimum 8 characters of letters and numbers"
          }
        />
      </div>
      <div className={classes.control}>
        <button
          className={`${classes.button} ${classes["auth-button"]}`}
          title="Edit"
          type="submit"
        >
          Edit
        </button>
        <button
          className={`${classes.button} ${classes["cancel-button"]}`}
          type="button"
          onClick={onCloseModal}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;
