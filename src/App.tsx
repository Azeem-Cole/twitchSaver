import { useEffect, useState } from "react";
import {
  getAuthUrl,
  parseAuthResponse,
  getUserInfo,
} from "./Auth/Twitch/TwitchAuth";
import { LiveChatIRC } from "./Auth/Twitch/TwitchIRC";
import { FaTwitch, FaYoutube } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { ProfileColor, TwitchColor, YTColor } from "./Constant";
import "./App.css";

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
      {accessToken ? (
        <div>
          <h1>Welcome, {user?.display_name}!</h1>
          <p>Email: {user?.email}</p>
          <LiveChatIRC />
        </div>
      ) : (
        <div id="button-wrapper">
          <button
            type="button"
            className="login-button TW"
            onClick={handleLogin}
          >
            <FaTwitch size={100} color={TwitchColor} />
            <p>Log in with Twitch </p>
          </button>
          <button type="button" className="login-button YT" onClick={() => {}}>
            <FaYoutube size={100} color={YTColor} />
            <p>Log in with YouTube </p>
          </button>

          <button type="button" className="login-button PR" onClick={() => {}}>
            <BsPersonFill size={100} color={ProfileColor} />
            <p>Log in with Profile </p>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
