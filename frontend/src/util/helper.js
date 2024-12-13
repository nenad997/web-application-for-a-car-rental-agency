export function extractStringFromURL(request, regex, fallbackVal) {
  const match = request.url.match(regex);
  const string = Boolean(match) ? match[1] : fallbackVal;

  return string;
}
