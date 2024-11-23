export function adjustSearchParams(initParams, cb) {
  const updatedParams = new URLSearchParams(initParams);
  cb(updatedParams);
}
