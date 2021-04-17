"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMessage = void 0;
// Global array of messages (will only hold latest 100)
// Neweest message is first. Oldest message is last
const messages = [];
function addMessage(username, msg, room) {
    if (messages.length > 100) {
        messages.pop();
        messages.unshift({
            username: username,
            msg: msg,
            room: room,
        });
    }
    else {
        messages.unshift({
            username: username,
            msg: msg,
            room: room,
        });
    }
}
exports.addMessage = addMessage;
//# sourceMappingURL=messages.js.map