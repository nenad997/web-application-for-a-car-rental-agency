export function filterError(errors, path) {
  const error = errors?.find((error) => error.path === path);

  if (!error) {
    return null;
  }

  return error;
}
