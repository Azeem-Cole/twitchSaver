import { useEffect } from "react";
import { getAuthUrlTW } from "../../Auth/Twitch/TwitchAuth";
import { FaTwitch, FaYoutube } from "react-icons/fa";
import { TwitchColor, youtubeColor } from "../../Constant";
import "@aws-amplify/ui-react/styles.css";
import { TwithLogin } from "../../Auth/Twitch/TwitchLogin";
import { getAuthUrlYT } from "../../Auth/YT/YTAuth";

const SignUp = () => {
  const handleLoginTW = () => {
    window.location.href = getAuthUrlTW();
  };

  const handleLoginYT = () => {
    window.location.href = getAuthUrlYT();
  };

  useEffect(() => {
    TwithLogin();
  }, [window.localStorage.getItem("token")]);

  return (
    <div id="main-app-wrapper">
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
          <FaYoutube size={100} color={youtubeColor} />
          <p>Log in with YouTube </p>
        </button>
      </div>
    </div>
  );
};

export default SignUp;
