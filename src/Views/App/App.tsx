import { LiveChatIRC } from "../TwitchChat/TwitchIRC";
import { logout } from "../../Auth/Twitch/TwitchLogout";
import { VscThreeBars } from "react-icons/vsc";
import { FaTwitch, FaYoutube } from "react-icons/fa";
import { cadetBlue, twitchColor, youtubeColor } from "../../Constant";
import { useRef, useState } from "react";
import "./App.css";

const App = () => {
  const [inputValueChannel, setInputValueChannel] = useState<string>();
  const [inputValueTerm, setInputValueTerm] = useState<string>();
  const inputRefChannel = useRef<HTMLInputElement>(null);
  const inputRefTerm = useRef<HTMLInputElement>(null);

  const handleInputChangeChannel = () => {
    setInputValueChannel(inputRefChannel.current?.value);
  };

  const handleInputChangeTerm = () => {
    setInputValueTerm(inputRefTerm.current?.value);
  };

  return (
    <div id="main-app-wrapper">
      <nav className="navigation-container">
        <ul className="nav-list">
          <li className="nav-list-item left main-logo">
            <h1>
              <div>Chat Watch!</div>
            </h1>
          </li>
          <li className="nav-list-item right">
            <a href="">Connect your other accounts</a>
          </li>
          <li className="nav-list-item right">
            <div>
              <FaYoutube
                size={40}
                color={youtubeColor}
                style={{ margin: 0, padding: 0 }}
              />
            </div>
          </li>

          <li className="nav-list-item right">
            <div>
              <FaTwitch
                size={40}
                color={twitchColor}
                style={{ margin: 0, padding: 0 }}
              />
            </div>
          </li>

          <li className="nav-list-item right">
            <button className="nav-list-option-btn">
              <VscThreeBars size={40} color={cadetBlue} />
            </button>
          </li>
        </ul>
      </nav>

      <div className="search-container">
        {/* <h1>hello you are logged in!</h1> */}
        <form className="search-form">
          <input
            type="text"
            ref={inputRefChannel}
            onChange={() => handleInputChangeChannel()}
            className="search-input-field"
            placeholder="Search for a Twitch Channel"
          />
          <hr />
          <button type="reset">Clear</button>
        </form>

        <div className="messageContainer">
          <LiveChatIRC channelName={inputValueChannel} />
        </div>
      </div>
      <button type="reset" onClick={() => logout()}>
        Sign Out
      </button>
    </div>
  );
};

export default App;
