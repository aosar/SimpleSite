const decodeToken = (token) => {
  const base64Url = token?.split('.')[1];
  const base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    Buffer.from(base64, 'base64').toString('binary')
  );
  return JSON.parse(jsonPayload);
};

module.exports = {
  decodeToken,
};