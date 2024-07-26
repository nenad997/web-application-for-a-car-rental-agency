export function getAuthToken() {
  const authToken = localStorage.getItem("token");
  if (!authToken) {
    return null;
  }
  return authToken;
}
