"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const googleapis_1 = require("googleapis");
const react_1 = require("react");
const apiKey = process.env.REACT_APP_YOUTUBE_API;
const youtube = googleapis_1.google.youtube({
    version: "v3",
    auth: apiKey,
});
exports.default = youtube;
function getLiveChatMessages(liveChatId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield youtube.liveChatMessages.list({
            liveChatId,
            part: ["snippet", "authorDetails"],
            maxResults: 10, // Adjust the number of messages you want to retrieve
        });
        const messages = response.data.items;
        // Process the messages as needed
        return messages;
    });
}
function getLiveChatId() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield youtube.liveBroadcasts.list({
                part: ["id", "snippet"],
                broadcastStatus: "active",
            });
            const liveBroadcasts = response.data.items;
            if (liveBroadcasts && liveBroadcasts.length > 0) {
                const liveChatId = (_a = liveBroadcasts[0].snippet) === null || _a === void 0 ? void 0 : _a.liveChatId;
                console.log("LIVE_CHAT_ID:", liveChatId);
            }
            else {
                console.log("No active live broadcasts found.");
            }
        }
        catch (error) {
            console.error("Error retrieving live chat ID:", error);
        }
        return "hey";
    });
}
function MyComponent() {
    const [messages, setMessages] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        // Call the function to retrieve live chat messages
        getLiveChatMessages("LIVE_CHAT_ID").then((messages) => {
            setMessages(messages === null || messages === void 0 ? void 0 : messages.toString());
        });
    }, []);
    // Render the messages in your component
    if (!!messages)
        return null;
    return (0, jsx_runtime_1.jsx)("div", { children: messages });
}
getLiveChatId();
//# sourceMappingURL=YTAuth.js.map