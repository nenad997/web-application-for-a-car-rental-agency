export function isDateValid(date) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date);
}

export function isRegistrationNumberValid(registrationNumber) {
  const regex = /^[a-zA-Z]{2}-\d+-[a-zA-Z]{2}$/;
  return regex.test(registrationNumber);
}

export function isValidURL(url) {
  const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
  return urlRegex.test(url);
}

export function isEmailValid(email) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

export function isUsernameValid(username) {
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;
  return regex.test(username);
}

export function isPasswordValid(password) {
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return regex.test(password);
}
