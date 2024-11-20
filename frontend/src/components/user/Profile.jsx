import React from "react";
import { useRouteLoaderData, Link } from "react-router-dom";

import classes from "./Profile.module.css";
import { removeAuthToken } from "../../util/authorization";

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
        <button
          className={`${classes.button} ${classes["logout-button"]}`}
          onClick={removeAuthToken}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Profile;
