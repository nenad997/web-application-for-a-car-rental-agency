import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

import Modal from "../ui/Modal";
import UserForm from "./UserForm";
import classes from "./Profile.module.css";
import { getUserId } from "../../util/authorization";

const Profile = ({ onRemoveAuthToken }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const userId = getUserId();

  const openModalHandler = () => {
    setIsModalVisible(true);
  };

  const closeModalHandler = () => {
    setIsModalVisible(false);
  };
  
  const submitFormHandler = useCallback(
    (inputs) => {
      fetch(`http://localhost:3000/auth/edit-user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update profile");
        }
        
        location.reload();
      })
      .catch((err) => {
        setError(err.message);
      });
    },
    [userId]
  );

  const portal = createPortal(
    <Modal>
      <UserForm
        onCloseModal={closeModalHandler}
        user={user}
        error={error}
        onSubmitForm={submitFormHandler}
      />
    </Modal>,
    document.getElementById("modal")
  );
  
  useEffect(() => {
    (async function fetchUserData() {
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
  }, [userId]);

  return (
    <>
      <div className={classes.profile}>
        <h2>Welcome, {user?.username}</h2>
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
