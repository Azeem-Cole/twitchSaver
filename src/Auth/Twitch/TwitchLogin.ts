import querystring from "querystring";

export const TwithLogin = () => {
  const params = querystring.parse(window.location.hash);

  const access_token_TW = <string>params["#access_token"];
  const error_TW = params["error"];

  if (access_token_TW) {
    localStorage.setItem("token", access_token_TW);
    window.location.href = window.location.host;

    console.log("window.location", window.location);
  }

  if (error_TW) {
    // eslint-disable-next-line no-console
    console.log(error_TW);
  }
};
