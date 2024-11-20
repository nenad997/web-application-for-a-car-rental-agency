import React from "react";
import { Link } from "react-router-dom";

import classes from "./Error.module.css";

const ErrorPage = () => {
  return (
    <main className={classes.page}>
      <h1>Something went wrong!!!</h1>
      <p>
        A page you require does not exist or is temporarely removed. <br />{" "}
        Please check your URL or try again later!
      </p>
      <Link to="/">Home Page</Link>
    </main>
  );
};

export default ErrorPage;
