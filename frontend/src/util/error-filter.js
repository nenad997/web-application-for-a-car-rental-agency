export function filterError(errors, path) {
  const error = errors?.find((error) => error.path === path);
  return error;
}
