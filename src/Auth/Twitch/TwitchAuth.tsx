/* 
Implicit grant flow
*/

import axios from "axios";
import querystring from "querystring";

const twitchAuth = {
  clientId: process.env.TWITCH_CLIENT_ID,
  redirectUri: process.env.REDIRECT_URL,
};

export const getAuthUrlTW = (): string => {
  const params = {
    client_id: twitchAuth.clientId,
    redirect_uri: twitchAuth.redirectUri,
    response_type: "token",
    scope: "user:read:email",
  };

  return `https://id.twitch.tv/oauth2/authorize?${querystring.stringify(
    params
  )}`;
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
    console.log("Failed to fetch user information");
  }
};
