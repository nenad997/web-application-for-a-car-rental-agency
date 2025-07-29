import { Form } from "react-router-dom";

import classes from "./UserForm.module.css";

const UserForm = () => {
  return (
    <Form className={classes.form} method="POST">
      <h2 className={classes.title}>Add New User</h2>

      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" placeholder="Enter email" />

      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Enter username"
      />

      <label htmlFor="id_card_number">ID Card Number</label>
      <input
        type="text"
        id="id_card_number"
        name="id_card_number"
        placeholder="Enter ID card number"
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter password"
      />

      <button type="submit" className={classes.submitButton}>
        Add User
      </button>
    </Form>
  );
};

export default UserForm;
