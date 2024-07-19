import React from "react";

import classes from "./Input.module.css";

const Input = ({ config, label, options = [], isSelect = false }) => {
  if (isSelect) {
    return (
      <>
        <label className={classes.label} htmlFor={config.id}>
          {label}
        </label>
        <select className={classes.select} {...config}>
          {options.length > 0 &&
            options.map((option, index) => (
              <option className={classes.option} value={option} key={index}>
                {option}
              </option>
            ))}
        </select>
      </>
    );
  }

  return (
    <>
      <label className={classes.label} htmlFor={config.id}>
        {label}
      </label>
      <input className={classes.input} {...config} />
    </>
  );
};

export default Input;
