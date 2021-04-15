// Global array of messages (will only hold latest 100)
// Neweest message is first. Oldest message is last
const messages: Array<{ username: string, msg: string, room: string }> = [];

function addMessage(username: string, msg: string, room: string) {
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


export {
    addMessage
}