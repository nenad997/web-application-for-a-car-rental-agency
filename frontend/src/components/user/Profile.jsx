import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import Modal from "../ui/Modal";
import UserForm from "./UserForm";
import classes from "./Profile.module.css";
import { getUserId } from "../../util/authorization";

const Profile = ({ onRemoveAuthToken, userId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const openModalHandler = () => {
    setIsModalVisible(true);
  };

  const closeModalHandler = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    (async function fetchUserData() {
      const userId = getUserId();
      try {
        const response = await fetch(
          `http://localhost:3000/auth/user/${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const responseData = await response.json();
        setUser(responseData.user);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, []);

  const portal = createPortal(
    <Modal>
      <UserForm onCloseModal={closeModalHandler} user={user} error={error} />
    </Modal>,
    document.getElementById("modal")
  );

  return (
    <>
      <div className={classes.profile}>
        <h2>Welcome {userId}</h2>
        <button
          className={`${classes.button} ${classes["edit-button"]}`}
          onClick={openModalHandler}
        >
          Edit Profile
        </button>
        <button
          className={`${classes.button} ${classes["logout-button"]}`}
          onClick={onRemoveAuthToken}
        >
          Logout
        </button>
      </div>
      {isModalVisible && portal}
    </>
  );
};

export default Profile;
