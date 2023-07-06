import axios from "axios";
import queryString from "querystring";

const scopes = ["https://www.googleapis.com/auth/youtube"];

const googleInfo = {
  client_id: process.env.REACT_APP_YOUTUBE_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_REDIRECT_URL,
  response_type: "token",
  scope: scopes,
};

export const getAuthUrlYT = (): string => {
  const params = {
    client_id: googleInfo.client_id,
    redirect_uri: googleInfo.redirect_uri,
    response_type: googleInfo.response_type,
    scope: googleInfo.scope,
  };

  return `https://accounts.google.com/o/oauth2/v2/auth?${queryString.stringify(
    params
  )}`;
};
export const parseAuthResponseYT = (): {
  accessToken?: string;
  error?: string;
} => {
  const params = queryString.parse(window.location.hash);
  const error = params.error as string;

  if (error) {
    return { error };
  }

  const accessToken = params["#access_token"] as string;
  return { accessToken };
};

export const getUserInfoYT = async (accessToken: string): Promise<any> => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/auth/youtube",
      {
        headers: {
          "Client-ID": googleInfo.client_id,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data[0];
  } catch (error) {
    throw new Error("Failed to fetch user information");
  }
};
