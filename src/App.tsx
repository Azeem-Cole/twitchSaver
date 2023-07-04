import { useEffect, useState } from "react";
import {
  getAuthUrlTW,
  parseAuthResponseTW,
  getUserInfoTW,
} from "./Auth/Twitch/TwitchAuth";
import { LiveChatIRC } from "./Auth/Twitch/TwitchIRC";
import { FaTwitch, FaYoutube } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { ProfileColor, TwitchColor, YTColor } from "./Constant";
import { getAuthUrlYT, parseAuthResponseYT } from "./Auth/YT/YTAuth";
import { useDispatch, useSelector } from "react-redux";
import { decrement } from "./reducers";
import { RootState } from ".";
import "./App.css";

const App = () => {
  const count = useSelector(decrement);
  const dispatch = useDispatch();
  const counterValue = useSelector((state: RootState) => state.value);

  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleAuthResponse = async () => {
      const { accessToken: access_token_TW } = parseAuthResponseTW();
      const { accessToken: access_token_YT } = parseAuthResponseYT();

      const newAccessToken = access_token_TW || access_token_YT;
      if (error) {
        setError(error);
        return;
      }

      if (newAccessToken) {
        setAccessToken(newAccessToken);
        try {
          const userInfo = await getUserInfoTW(newAccessToken);
          setUser(userInfo);
        } catch (error) {
          setError("Failed to fetch user information");
        }
      }
    };

    handleAuthResponse();
  }, []);

  const handleLoginTW = () => {
    window.location.href = getAuthUrlTW();
    dispatch(count);
  };

  const handleLoginYT = () => {
    window.location.href = getAuthUrlYT();
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
            onClick={handleLoginTW}
          >
            <FaTwitch size={100} color={TwitchColor} />
            <p>Log in with Twitch </p>
          </button>
          <button
            type="button"
            className="login-button YT"
            onClick={handleLoginYT}
          >
            <FaYoutube size={100} color={YTColor} />
            <p>Log in with YouTube </p>
          </button>

          <button type="button" className="login-button PR" onClick={() => {}}>
            <BsPersonFill size={100} color={ProfileColor} />
            <p>Log in with Profile </p>
          </button>
        </div>
      )}
      <>state test: {counterValue}</>
    </div>
  );
};

export default App;
