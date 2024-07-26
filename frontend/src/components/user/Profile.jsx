import React from "react";

import classes from "./Profile.module.css";

const Profile = ({ onRemoveAuthToken }) => {
  return (
    <div className={classes.profile}>
      <button onClick={onRemoveAuthToken}>Logout</button>
    </div>
  );
};

export default Profile;
