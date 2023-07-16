import { useEffect, useState } from "react";
import { getAuthUrlTW } from "./Auth/Twitch/TwitchAuth";
import { LiveChatIRC } from "./Auth/Twitch/TwitchIRC";
import { FaTwitch, FaYoutube } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { ProfileColor, TwitchColor, YTColor } from "./Constant";
import awsconfig from "./aws-exports";
import { Amplify } from "aws-amplify";
import { SignUpParameters } from "./Auth/Profile/ProfileAuth";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import { TwithLogin } from "./Auth/Twitch/TwitchLogin";
import { getAuthUrlYT } from "./Auth/YT/YTAuth";

Amplify.configure(awsconfig);

const SignUp = () => {
  const [inputs, setInputs] = useState<SignUpParameters>({
    username: "",
    password: "",
    email: "",
  });

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
        <button type="button" className="login-button YT">
          <FaYoutube size={100} color={YTColor} onClick={handleLoginYT} />
          <p>Log in with YouTube </p>
        </button>

        <button type="button" className="login-button PR">
          <BsPersonFill size={100} color={ProfileColor} />
          <p>Log in with Profile </p>
        </button>
      </div>
    </div>
  );
};

export default SignUp;
