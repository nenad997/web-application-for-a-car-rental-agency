import React, { forwardRef } from "react";

import classes from "./Input.module.css";

const Input = forwardRef(
  ({ config, label, errorText, hasError, actionData }, ref) => {
    const inputClasses = `${classes.input} ${
      hasError ? classes["error-input"] : undefined
    }`;

    const serverError = Boolean(
      actionData?.message && actionData.status === 302
    );

    return (
      <>
        {label && (
          <label className={classes.label} htmlFor={config.id}>
            {label}
          </label>
        )}
        <input className={inputClasses} {...config} ref={ref} />
        {hasError && <p className={classes.error}>{errorText}</p>}
        {serverError && <p className={classes.error}>{actionData?.message}</p>}
      </>
    );
  }
);

export default Input;

export const SelectInput = ({
  label,
  config,
  hasError,
  errorText,
  options = [],
}) => {
  const selectClasses = `${classes.select} ${
    hasError ? classes["error-input"] : undefined
  }`;

  return (
    <>
      <label className={classes.label} htmlFor={config.id}>
        {label}
      </label>
      <select className={selectClasses} {...config}>
        {options.length > 0 &&
          options.map((option, index) => (
            <option className={classes.option} value={option} key={index}>
              {option}
            </option>
          ))}
      </select>
      {hasError && <p className={classes.error}>{errorText}</p>}
    </>
  );
};
