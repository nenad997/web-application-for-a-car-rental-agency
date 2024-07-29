import React from "react";
import { redirect, json } from "react-router-dom";

import { getAuthToken } from "../util/authorization";

const Record = () => {
  return <h1>The Record Route</h1>;
};

export default Record;

export function loader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }
}
