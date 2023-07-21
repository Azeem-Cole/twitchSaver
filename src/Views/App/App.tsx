import { LiveChatIRC } from "../TwitchChat/TwitchIRC";
import { logout } from "../../Auth/Twitch/TwitchLogout";
import { VscThreeBars } from "react-icons/vsc";
import { FaTwitch, FaYoutube } from "react-icons/fa";

import "./App.css";
import { cadetBlue, TwitchColor, youtubeColor } from "../../Constant";
import { useRef, useState } from "react";

const App = () => {
  const [inputValue, setInputValue] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = () => {
    setInputValue(inputRef.current?.value);
  };

  return (
    <div id="main-app-wrapper">
      <nav className="navigation-container">
        <ul className="nav-list">
          <li className="nav-list-left">
            <div>Twitch Chat</div>
          </li>
          <li className="nav-list-right">
            <a href=""> Connect your other accounts</a>
          </li>
          <li className="nav-list-right">
            <div>
              <FaYoutube
                size={40}
                color={youtubeColor}
                style={{ margin: 0, padding: 0 }}
              />
            </div>
          </li>

          <li className="nav-list-right">
            <div>
              <FaTwitch
                size={40}
                color={TwitchColor}
                style={{ margin: 0, padding: 0 }}
              />
            </div>
          </li>

          <li className="nav-list-right">
            <button className="nav-list-option-btn">
              <VscThreeBars size={40} color={cadetBlue} />
            </button>
          </li>
        </ul>
      </nav>
      <div>
        <h1>hello you are logged in!</h1>
        <form>
          <input
            type="text"
            ref={inputRef}
            onChange={() => handleInputChange()}
          />
          <button type="button">Submit</button>
        </form>
        <div className="messageContainer">
          <LiveChatIRC channelName={inputValue} />
        </div>
      </div>
      <button onClick={() => logout()}>Sign Out</button>
    </div>
  );
};

export default App;
