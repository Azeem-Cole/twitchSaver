import { useEffect, useState } from "react";
import {
  getAuthUrl,
  parseAuthResponse,
  getUserInfo,
} from "./Auth/Twitch/TwitchAuth";
import { LiveChatIRC } from "./Auth/Twitch/TwitchIRC";
import { FaTwitch, FaYoutube } from "react-icons/fa";
import "./App.css";
import { TwitchColor, YTColor } from "./Constant";

const App = () => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleAuthResponse = async () => {
      const { accessToken, error } = parseAuthResponse();

      if (error) {
        setError(error);
        return;
      }

      if (accessToken) {
        setAccessToken(accessToken);

        try {
          const userInfo = await getUserInfo(accessToken);
          setUser(userInfo);
        } catch (error) {
          setError("Failed to fetch user information");
        }
      }
    };

    handleAuthResponse();
  }, []);

  const handleLogin = () => {
    window.location.href = getAuthUrl();
  };

  return (
    <div id="main-app-wrapper">
      <div></div>
      {accessToken ? (
        <div>
          <h1>Welcome, {user?.display_name}!</h1>
          <p>Email: {user?.email}</p>
          <LiveChatIRC />
        </div>
      ) : (
        <>
          <button onClick={handleLogin}>
            Log in with Twitch <FaTwitch size={40} color={TwitchColor} />
          </button>
          <button onClick={handleLogin}>
            Log in with Yotube <FaYoutube size={40} color={YTColor} />
          </button>
        </>
      )}
    </div>
  );
};

export default App;
