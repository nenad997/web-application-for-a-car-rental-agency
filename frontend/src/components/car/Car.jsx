import React from "react";
import { Link } from "react-router-dom";

import classes from "./Car.module.css";

const Car = ({ title, imageUrl, id, price, isAvailable }) => {
  return (
    <article
      className={classes.item}
      style={{ border: `4px solid ${isAvailable ? "green" : "red"}` }}
    >
      <h3
        className={classes.title}
        style={{ textDecoration: isAvailable ? "none" : "line-through" }}
      >
        {title}
      </h3>
      <figure className={classes.figure}>
        <img className={classes.img} src={imageUrl} alt={title} />
      </figure>
      <p className={classes.price}>
        {price}{" "}
        <span>
          <sup>€</sup>
        </span>
        {"/"}
        <span>
          <sub>day</sub>
        </span>
      </p>
      <Link className={classes.link} to={`car/${id}`}>
        See Info
      </Link>
    </article>
  );
};

export default Car;
