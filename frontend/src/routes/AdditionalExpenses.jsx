import React from "react";
import { redirect } from "react-router-dom";

import { getAuthToken } from "../util/authorization";

const AdditionalExpenses = () => {
  return <h1>The AdditionalExpenses Route</h1>;
};

export default AdditionalExpenses;

export function loader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }
  return null;
}
