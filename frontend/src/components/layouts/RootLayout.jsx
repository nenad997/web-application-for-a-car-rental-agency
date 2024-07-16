import React from "react";
import { Outlet } from "react-router-dom";

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
