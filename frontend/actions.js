import { redirect } from "react-router-dom";

import { removeAuthToken } from "./src/util/authorization";

export function logout() {
  removeAuthToken(() => {
    console.log("Logout successful");
  });

  return redirect("/");
}
