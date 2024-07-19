import React from "react";
import { Link } from "react-router-dom";

import classes from "./Car.module.css";

const Car = ({ title, imageUrl, id }) => {
  return (
    <li className={classes.item}>
      <h3 className={classes.title}>TITLE</h3>
      <figure className={classes.figure}>
        <img
          className={classes.img}
          src="https://images.unsplash.com/photo-1666335009164-2597314da8e7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Renault Clio"
        />
      </figure>
      <Link className={classes.link} to={"car/123"}>
        See Info
      </Link>
    </li>
  );
};

export default Car;
