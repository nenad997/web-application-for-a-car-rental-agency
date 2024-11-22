import React from "react";
import { useRouteLoaderData, Link, Form } from "react-router-dom";

import classes from "./Profile.module.css";

const Profile = () => {
  const user = useRouteLoaderData("profile-root");

  return (
    <>
      <div className={classes.profile}>
        <h2>Welcome, {user?.username}</h2>
        <Link
          to={`/profile/user?username=${
            user?.username
          }&createdAt=${user?.createdAt.toString()}`}
          className={`${classes.button} ${classes["edit-button"]}`}
        >
          Edit Profile
        </Link>
        <Form method="POST" action="/logout">
          <button
            type="submit"
            className={`${classes.button} ${classes["logout-button"]}`}
          >
            Logout
          </button>
        </Form>
      </div>
    </>
  );
};

export default Profile;
