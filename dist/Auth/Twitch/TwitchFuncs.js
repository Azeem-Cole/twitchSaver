"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomColor = void 0;
function generateRandomColor() {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
}
exports.generateRandomColor = generateRandomColor;
//# sourceMappingURL=TwitchFuncs.js.map