import React from "react";

import classes from "./User.module.css";

const User = ({ username, idCardNumber, carData }) => {
  return (
    <li className={classes.item}>
      <h1>{username}</h1>
      <h3>{idCardNumber}</h3>
      <p className={classes.title}>
        {carData.make} - {carData.model}
      </p>
    </li>
  );
};

export default User;
