import axios from "axios";
import queryString from "query-string";

const twitchAuth = {
  clientId: process.env.REACT_APP_CLIENT_ID,
  redirectUri: process.env.REACT_APP_REDIRECT_URL,
};

export const getAuthUrlTW = (): string => {
  const params = {
    client_id: twitchAuth.clientId,
    redirect_uri: twitchAuth.redirectUri,
    response_type: "token",
    scope: "user:read:email",
  };

  return `https://id.twitch.tv/oauth2/authorize?${queryString.stringify(
    params
  )}`;
};

export const parseAuthResponseTW = (): {
  accessToken?: string;
  error?: string;
} => {
  const params = queryString.parse(window.location.hash);
  console.log(params)
  const error = params.error as string;

  if (error) {
    return { error };
  }

  const accessToken = params.access_token as string;
  return { accessToken };
};

export const getUserInfoTW = async (accessToken: string): Promise<any> => {
  try {
    const response = await axios.get("https://api.twitch.tv/helix/users", {
      headers: {
        "Client-ID": twitchAuth.clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data[0];
  } catch (error) {
    throw new Error("Failed to fetch user information");
  }
};
