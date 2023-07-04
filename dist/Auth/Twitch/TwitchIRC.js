"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveChatIRC = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tmi_js_1 = __importDefault(require("tmi.js"));
const fa_1 = require("react-icons/fa");
const server_1 = require("react-dom/server");
const TwitchFuncs_1 = require("./TwitchFuncs");
require("./TwitchIRC.css");
const Constant_1 = require("../../Constant");
const client = new tmi_js_1.default.client({
    channels: ["summit1g"],
});
const jsxElement = (0, jsx_runtime_1.jsx)(fa_1.FaTwitch, { size: 16, color: Constant_1.TwitchColor });
client.connect();
const LiveChatIRC = () => {
    window.onload = init;
    function init() {
        const messageContainer = document.getElementById("messageContainer");
        client.on("message", (channel, tags, message, self) => {
            var _a;
            const displayName = tags["display-name"];
            const formattedName = ((0, jsx_runtime_1.jsx)("span", { style: { color: `${(0, TwitchFuncs_1.generateRandomColor)()}` }, children: displayName }));
            const containerName = document.createElement("span");
            containerName.innerHTML = (0, server_1.renderToString)(formattedName);
            const formattedMessage = `: ${message} `;
            if (messageContainer) {
                const messageElement = document.createElement("p");
                const container = document.createElement("span");
                container.innerHTML = (0, server_1.renderToString)(jsxElement);
                messageElement.classList.add("twitch-chat");
                messageElement.appendChild(container);
                messageElement.append(containerName);
                messageElement.append(formattedMessage);
                messageContainer.prepend(messageElement);
                const messageLogCount = messageContainer.children.length;
                if (messageLogCount > 20) {
                    (_a = messageContainer.lastElementChild) === null || _a === void 0 ? void 0 : _a.remove();
                }
            }
        });
    }
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("div", { id: "messageContainer" }) }));
};
exports.LiveChatIRC = LiveChatIRC;
//# sourceMappingURL=TwitchIRC.js.map