import { LiveChatIRC } from "./Auth/Twitch/TwitchIRC";
import { logout } from "./Auth/Twitch/TwitchLogout";
import { VscThreeBars } from "react-icons/vsc";
import { FaTwitch, FaYoutube } from "react-icons/fa";

import "./App.css";
import { YTColor } from "./Constant";

const App = () => {
  return (
    <div id="main-app-wrapper">
      <nav>
        <ul className="nav-list">
          <li className="nav-list-left">
            <div>Twitch Chat</div>
          </li>
          <li className="nav-list-right">
            <a href="">Connect your other accounts</a>
          </li>
          <li className="nav-list-right">
            <div>
              <FaYoutube
                size={40}
                color={YTColor}
                style={{ margin: 0, padding: 0 }}
              />
            </div>
          </li>

          <li className="nav-list-right">
            <button className="nav-list-option">
              <VscThreeBars />
            </button>
          </li>
        </ul>
      </nav>
      <div>
        <h1>hello you are logged in!</h1>
        <LiveChatIRC />
      </div>
      <button onClick={() => logout()}>Sign Out</button>
    </div>
  );
};

export default App;
