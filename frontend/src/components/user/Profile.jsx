import React, { useState } from "react";
import { createPortal } from "react-dom";

import Modal from "../ui/Modal";
import UserForm from "./UserForm";
import classes from "./Profile.module.css";

const Profile = ({ onRemoveAuthToken, userId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModalHandler = () => {
    setIsModalVisible(true);
  };

  const closeModalHandler = () => {
    setIsModalVisible(false);
  };

  const portal = createPortal(
    <Modal>
      <UserForm onCloseModal={closeModalHandler} />
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
