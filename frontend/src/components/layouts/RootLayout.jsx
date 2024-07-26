import React from "react";
import { Outlet } from "react-router-dom";

import { getAuthToken } from "../../util/authorization";
import MainNavbar from "../navigation/MainNavbar";

const RootLayout = () => {
  return (
    <>
      <MainNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;

export function loader() {
  const token = getAuthToken();

  if (!token) {
    return null;
  }
  return token;
}
