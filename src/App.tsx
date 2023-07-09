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
import awsconfig from "./aws-exports";
import { Amplify } from "aws-amplify";
import type { WithAuthenticatorProps } from "@aws-amplify/ui-react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import { signUp, SignUpParameters } from "./Auth/Profile/ProfileAuth";

Amplify.configure(awsconfig);

const App = () => {
  const count = useSelector(decrement);
  const dispatch = useDispatch();
  const counterValue = useSelector((state: RootState) => state.value);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [signInwithProfile, setSignInwithProfile] = useState<boolean>(false);
  const [inputs, setInputs] = useState<SignUpParameters>({
    username: "",
    password: "",
    email: "",
  });
  const [user1, setUser] = useState<any>(null);
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

  const handleLoginProfile = () => {
    signUp({ ...inputs });
  };

  const signInwithProfileClick = () => {
    setSignInwithProfile(true);
  };

  return (
    <div id="main-app-wrapper">
      {accessToken ? (
        <div>
          <h1>Welcome, {user1?.display_name}!</h1>
          <p>Email: {user1?.attributes?.email}</p>
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

          <button
            type="button"
            className="login-button PR"
            onClick={signInwithProfileClick}
          >
            <BsPersonFill size={100} color={ProfileColor} />
            <p>Log in with Profile </p>
          </button>

          {signInwithProfile && (
            <form onSubmit={handleLoginProfile}>
              <label>
                UserName:
                <input
                  type="text"
                  value={inputs.username}
                  onChange={(e) =>
                    setInputs({ ...inputs, username: e.target.value })
                  }
                />
              </label>
              <label>
                Email:
                <input
                  type="text"
                  value={inputs.email}
                  onChange={(e) =>
                    setInputs({ ...inputs, email: e.target.value })
                  }
                />
              </label>

              <label>
                password:
                <input
                  type="text"
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                />
              </label>
              <input type="submit" />
            </form>
          )}
        </div>
      )}
      <>state test: {counterValue}</>
    </div>
  );
};

export default App;
