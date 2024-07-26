import React from "react";
import { redirect } from "react-router-dom";

import { getAuthToken } from "../util/authorization";

const ClientReverses = () => {
  return <h1>The ClientReverses Route</h1>;
};

export default ClientReverses;

export function loader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }
  return null;
}
