import querystring from "querystring";

export const TwithLogin = () => {
  const params = querystring.parse(window.location.hash);

  const accessTokenTW = <string>params["#access_token"];
  const errorTW = params["error"];

  if (accessTokenTW) {
    localStorage.setItem("token", accessTokenTW);
    window.location.href = window.location.origin;
  }

  if (errorTW) {
    // eslint-disable-next-line no-console
    console.log(errorTW);
  }
};
