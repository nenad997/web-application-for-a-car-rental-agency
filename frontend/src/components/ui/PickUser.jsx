import { useState, useEffect } from "react";
import { useLoaderData, useActionData } from "react-router-dom";
import { useSelector } from "react-redux";

import classes from "./PickUser.module.css";
import { selectUsersState } from "../../store";

const PickUser = () => {
  const loaderData = useLoaderData();
  const [idValue, setIdValue] = useState(
    loaderData.data?.rentedBy?._id.toString() ?? ""
  );
  const actionData = useActionData();

  const { users, isLoading, error } = useSelector(selectUsersState);

  const selectClasses = loaderData.data?.rentedBy?._id
    ? `${classes.select} ${classes.disabled}`
    : classes.select;

  let usersContent = <p>Loading users...</p>;

  if (error) {
    usersContent = <p>{error}</p>;
  }

  if (!isLoading && users.length > 0) {
    usersContent = (
      <select
        className={selectClasses}
        name="userId"
        onChange={(event) => setIdValue(event.target.value)}
        value={idValue}
      >
        <option value="">No User Selected</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.username}
          </option>
        ))}
      </select>
    );
  }

  useEffect(() => {
    setIdValue(loaderData.data.rentedBy?._id?.toString() ?? "");
  }, [loaderData.data.rentedBy]);

  return (
    <>
      {usersContent}
      {actionData?.path === "picker" && (
        <span className={classes.error}>{actionData.message}</span>
      )}
    </>
  );
};

export default PickUser;
