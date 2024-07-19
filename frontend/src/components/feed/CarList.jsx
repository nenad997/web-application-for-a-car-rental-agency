import React from "react";

import classes from "./CarList.module.css";
import Car from "./Car";

const CarList = () => {
  return (
    <ul className={classes.list}>
      <Car />
      <Car />
      <Car />
      <Car />
      <Car />
      <Car />
    </ul>
  );
};

export default CarList;
