import { useState, useEffect, act } from "react";
import { useLoaderData, useActionData } from "react-router-dom";

const PickUser = () => {
  const [users, setUsers] = useState([]);
  const loaderData = useLoaderData();
  const [idValue, setIdValue] = useState(
    loaderData.data?.rentedBy?._id.toString() ?? ""
  );
  const actionData = useActionData();

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("http://localhost:3000/api/users");

      const users = await response.json();

      setUsers(users);
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    setIdValue(loaderData.data.rentedBy?._id?.toString() ?? "");
  }, [loaderData.data.rentedBy]);

  return (
    <>
      <select
        style={{
          padding: ".7rem",
          width: "100%",
          border: "none",
          borderRadius: "2px",
        }}
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
      {actionData?.path === "picker" && (
        <span style={{ color: "red" }}>{actionData.message}</span>
      )}
    </>
  );
};

export default PickUser;
