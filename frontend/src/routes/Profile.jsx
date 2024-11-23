import React from "react";
import { Outlet, json, redirect } from "react-router-dom";

import { getUserId } from "../util/authorization";
import Profile from "../components/user/Profile";

const ProfilePage = () => {
  return (
    <>
      <Profile />
      <Outlet />
    </>
  );
};

export default ProfilePage;

export async function loader() {
  const loggedInUser = getUserId();

  if (!loggedInUser) {
    return redirect("/auth");
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/user/${loggedInUser}`
    );

    if (!response.ok) {
      throw new Error("Failed to load user");
    }

    const responseData = await response.json();
    return responseData.user;
  } catch (err) {
    return json({ message: err.message }, { status: 422 });
  }
}
