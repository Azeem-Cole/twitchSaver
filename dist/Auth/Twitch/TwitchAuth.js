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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = exports.parseAuthResponse = exports.getAuthUrl = exports.twitchAuth = void 0;
const axios_1 = __importDefault(require("axios"));
const query_string_1 = __importDefault(require("query-string"));
// import dotenv from "dotenv";
// dotenv.config();
exports.twitchAuth = {
    clientId: process.env.REACT_APP_CLIENT_ID,
    redirectUri: process.env.REACT_APP_REDIRECT_URL,
};
const getAuthUrl = () => {
    const params = {
        client_id: exports.twitchAuth.clientId,
        redirect_uri: exports.twitchAuth.redirectUri,
        response_type: "token",
        scope: "user:read:email",
    };
    return `https://id.twitch.tv/oauth2/authorize?${query_string_1.default.stringify(params)}`;
};
exports.getAuthUrl = getAuthUrl;
const parseAuthResponse = () => {
    const params = query_string_1.default.parse(window.location.hash);
    const error = params.error;
    if (error) {
        return { error };
    }
    const accessToken = params.access_token;
    return { accessToken };
};
exports.parseAuthResponse = parseAuthResponse;
const getUserInfo = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://api.twitch.tv/helix/users", {
            headers: {
                "Client-ID": exports.twitchAuth.clientId,
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.data[0];
    }
    catch (error) {
        throw new Error("Failed to fetch user information");
    }
});
exports.getUserInfo = getUserInfo;
// const twitchPubSub = new BasicPubSubClient();
// // const { accessToken } = parseAuthResponse();
// // twitchPubSub.registerUserListener(twitchAuth.clientId, accessToken); // Replace with your Twitch App Client ID and user access token
// export const listenToChannelChat = (channelId: string) => {
//   twitchPubSub.onMessage((topic, message) => {
//     console.log(message);
//   });
//   twitchPubSub.connect().catch(console.error);
// };
// export const disconnectFromChannelChat = () => {
//   twitchPubSub.disconnect();
// };
//# sourceMappingURL=TwitchAuth.js.map