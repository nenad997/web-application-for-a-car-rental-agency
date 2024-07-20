import React from "react";

import classes from "./Input.module.css";

const Input = ({
  config,
  label,
  options = [],
  errorText = undefined,
  isSelect = false,
  hasError = false,
}) => {
  const selectClasses = `${classes.select} ${
    hasError ? classes["error-input"] : undefined
  }`;

  const inputClasses = `${classes.input} ${
    hasError ? classes["error-input"] : undefined
  }`;

  if (isSelect) {
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
  }

  return (
    <>
      <label className={classes.label} htmlFor={config.id}>
        {label}
      </label>
      <input className={inputClasses} {...config} />
      {hasError && <p className={classes.error}>{errorText}</p>}
    </>
  );
};

export default Input;
