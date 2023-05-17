const STORAGE_KEY = "LH_STORAGE_KEY";
// 1. reading the access token from storage

export function isTokenExpired(exp: number) {
  if (!exp) return true;

  if (Date.now() >= exp * 1000) {
    return false;
  }
  return true;
}
export function readAccessToken() {
  const ls = localStorage || window.localStorage;

  if (!ls) {
    throw new Error("localStorage is not available");
  }
  const data = ls.getItem(STORAGE_KEY);

  if (!data) return null;

  return JSON.parse(data) as {
    accessToken: string;
    refreshToken: string;
    exp: number;
  };
}
// 2. setting the access token in storage
export function setAccessToken(accessToken: string, refreshToken: string) {
  const { exp } = parseJwt(accessToken);
  const ls = localStorage || window.localStorage;

  if (!ls) {
    throw new Error("localStorage is not available");
  }

  ls.setItem(STORAGE_KEY, JSON.stringify({ accessToken, refreshToken, exp }));
}

// delete access token from storage
export function deleteAccessToken() {
  const ls = localStorage || window.localStorage;

  ls.setItem(STORAGE_KEY, "");
}
// 3. parse the JWT token that comes back and extract the exp date field
function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
