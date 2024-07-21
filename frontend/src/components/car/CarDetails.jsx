import React from "react";

import classes from "./CarDetails.module.css";

const CarDetails = () => {
  return (
    <div className={classes.item}>
      <h3 className={classes.title}>VEHICLE MAKE - VEHICLE MODEL</h3>
      <figure className={classes.figure}>
        <img className={classes.image} src="" alt="" />
      </figure>
      <details className={classes.details}>
        <summary>DETAILS</summary>
        <p>MORE INFO</p>
        <p>FUEL</p>
        <p>PRICE</p>
      </details>
    </div>
  );
};

export default CarDetails;
