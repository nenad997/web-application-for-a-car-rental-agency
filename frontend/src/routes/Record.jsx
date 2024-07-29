import React from "react";
import { redirect, json } from "react-router-dom";

import { getAuthToken } from "../util/authorization";
import Search from "../components/record/Search";

const Record = () => {
  return <Search />;
};

export default Record;

export function loader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }
  return null;
}
