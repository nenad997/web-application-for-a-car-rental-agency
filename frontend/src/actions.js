import { redirect } from "react-router-dom";

import { removeAuthToken } from "./util/authorization";

export function logout() {
  removeAuthToken(() => {});

  return redirect("/?auth=logout");
}
