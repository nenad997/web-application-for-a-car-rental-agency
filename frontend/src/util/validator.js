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
