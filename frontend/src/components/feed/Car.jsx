import React from "react";
import { Link } from "react-router-dom";

import classes from "./Car.module.css";

const Car = ({ title, imageUrl, id }) => {
  return (
    <li className={classes.item}>
      <h3 className={classes.title}>{title}</h3>
      <figure className={classes.figure}>
        <img className={classes.img} src={imageUrl} alt={title} />
      </figure>
      <Link className={classes.link} to={`car/${id}`}>
        See Info
      </Link>
    </li>
  );
};

export default Car;
