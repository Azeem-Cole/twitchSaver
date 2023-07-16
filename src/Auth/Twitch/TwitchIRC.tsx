import tmi from "tmi.js";
import { FaTwitch } from "react-icons/fa";
import { renderToString } from "react-dom/server";
import { generateRandomColor } from "./TwitchFuncs";
import "./TwitchIRC.css";
import { TwitchColor } from "../../Constant";

const client = new tmi.client({
  channels: ["Agent00"],
});

const jsxElement = <FaTwitch size={16} color={TwitchColor} />;
client.connect();

export const LiveChatIRC = () => {
  window.onload = init;
  function init() {
    const messageContainer = document.getElementById("messageContainer");

    client.on("message", (channel, tags, message, self) => {
      const displayName = tags["display-name"];

      const formattedName = (
        <span style={{ color: `${generateRandomColor()}` }}>{displayName}</span>
      );

      const containerName = document.createElement("span");
      containerName.innerHTML = renderToString(formattedName);

      const formattedMessage = `: ${message} `;

      if (messageContainer) {
        const messageElement = document.createElement("p");
        const container = document.createElement("span");
        container.innerHTML = renderToString(jsxElement);
        messageElement.classList.add("twitch-chat");
        messageElement.appendChild(container);
        messageElement.append(containerName);
        messageElement.append(formattedMessage);

        messageContainer.prepend(messageElement);

        const messageLogCount = messageContainer.children.length;

        if (messageLogCount > 20) {
          messageContainer.lastElementChild?.remove();
        }
      }
    });
  }
  return (
    <div>
      <div id="messageContainer"></div>
    </div>
  );
};
