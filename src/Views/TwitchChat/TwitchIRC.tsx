import tmi from "tmi.js";
import { FaTwitch } from "react-icons/fa";
import { renderToString } from "react-dom/server";
import "./TwitchIRC.css";
import { twitchColor } from "../../Constant";
import { generateRandomColor } from "../../Auth/Twitch/TwitchFuncs";
import { useEffect } from "react";
type prop = { channelName?: string };

export const LiveChatIRC = ({ channelName }: prop) => {
  const client = new tmi.client({
    channels: [channelName || "agent00"],
  });

  useEffect(
    () => () => {
      try {
        client.disconnect();
      } catch {
        null;
      }
    },
    [channelName]
  );

  function waitForElementToLoad() {
    const messageContainer = document.getElementById("messageContainer");

    if (messageContainer) {
      const jsxElement = <FaTwitch size={16} color={twitchColor} />;
      client.connect().catch(() => {
        return null;
      });

      client.on("message", (channel, tags, message, self) => {
        const displayName = tags["display-name"];

        const formattedName = (
          <span style={{ color: `${generateRandomColor()}` }}>
            {channel}: {displayName}
          </span>
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
    } else {
      setTimeout(waitForElementToLoad, 100);
    }
  }
  waitForElementToLoad();
  return (
    <div>
      <div id="messageContainer"></div>
    </div>
  );
};
