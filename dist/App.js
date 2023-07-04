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
const react_1 = require("react");
const TwitchAuth_1 = require("./Auth/Twitch/TwitchAuth");
const TwitchIRC_1 = require("./Auth/Twitch/TwitchIRC");
const fa_1 = require("react-icons/fa");
const bs_1 = require("react-icons/bs");
const Constant_1 = require("./Constant");
require("./App.css");
const App = () => {
    const [accessToken, setAccessToken] = (0, react_1.useState)(undefined);
    const [user, setUser] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(undefined);
    (0, react_1.useEffect)(() => {
        const handleAuthResponse = () => __awaiter(void 0, void 0, void 0, function* () {
            const { accessToken, error } = (0, TwitchAuth_1.parseAuthResponse)();
            if (error) {
                setError(error);
                return;
            }
            if (accessToken) {
                setAccessToken(accessToken);
                try {
                    const userInfo = yield (0, TwitchAuth_1.getUserInfo)(accessToken);
                    setUser(userInfo);
                }
                catch (error) {
                    setError("Failed to fetch user information");
                }
            }
        });
        handleAuthResponse();
    }, []);
    const handleLogin = () => {
        window.location.href = (0, TwitchAuth_1.getAuthUrl)();
    };
    return ((0, jsx_runtime_1.jsx)("div", { id: "main-app-wrapper", children: accessToken ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("h1", { children: ["Welcome, ", user === null || user === void 0 ? void 0 : user.display_name, "!"] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Email: ", user === null || user === void 0 ? void 0 : user.email] }), (0, jsx_runtime_1.jsx)(TwitchIRC_1.LiveChatIRC, {})] })) : ((0, jsx_runtime_1.jsxs)("div", { id: "button-wrapper", children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", className: "login-button TW", onClick: handleLogin, children: [(0, jsx_runtime_1.jsx)(fa_1.FaTwitch, { size: 100, color: Constant_1.TwitchColor }), (0, jsx_runtime_1.jsx)("p", { children: "Log in with Twitch " })] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "login-button YT", onClick: () => { }, children: [(0, jsx_runtime_1.jsx)(fa_1.FaYoutube, { size: 100, color: Constant_1.YTColor }), (0, jsx_runtime_1.jsx)("p", { children: "Log in with YouTube " })] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "login-button PR", onClick: () => { }, children: [(0, jsx_runtime_1.jsx)(bs_1.BsPersonFill, { size: 100, color: Constant_1.ProfileColor }), (0, jsx_runtime_1.jsx)("p", { children: "Log in with Profile " })] })] })) }));
};
exports.default = App;
//# sourceMappingURL=App.js.map