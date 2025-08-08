import { Form } from "react-router-dom";

import classes from "./UserForm.module.css";
import Input from "../ui/Input";

const UserForm = () => {
  return (
    <Form className={classes.form} method="POST">
      <h2 className={classes.title}>Add New User</h2>

      <div>
        <Input
          label="Email"
          config={{
            type: "email",
            id: "email",
            name: "email",
            placeholder: "Enter email",
          }}
        />
      </div>

      <div>
        <Input
          label="Username"
          config={{
            type: "text",
            id: "username",
            name: "username",
            placeholder: "Enter username",
          }}
        />
      </div>

      <div>
        <Input
          label="ID Card Number"
          config={{
            type: "text",
            id: "id_card_number",
            name: "id_card_number",
            placeholder: "Enter ID card number",
          }}
        />
      </div>

      <div>
        <Input
          label="Password"
          config={{
            type: "password",
            id: "password",
            name: "password",
            placeholder: "Please choose a password",
          }}
        />
      </div>

      <button type="submit" className={classes.submitButton}>
        Add User
      </button>
    </Form>
  );
};

export default UserForm;
