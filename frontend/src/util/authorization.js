export function setAuthToken(token) {
  const now = new Date().getTime();
  const tokenData = {
    value: token,
    timestamp: now,
  };

  localStorage.setItem("token", JSON.stringify(tokenData));
}

export function getAuthToken() {
  const tokenData = localStorage.getItem("token");
  if (!tokenData) {
    return null;
  }

  const { value, timestamp } = JSON.parse(tokenData);
  const now = new Date().getTime();
  const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000;

  if (now - timestamp > twoDaysInMillis) {
    localStorage.removeItem("token");
    return null;
  }

  return value;
}

export function removeAuthToken() {
  const tokenData = localStorage.getItem("token");
  if (!tokenData) {
    return false;
  }

  localStorage.removeItem("token");
  location.href = "/auth?mode=login";
  return true;
}
