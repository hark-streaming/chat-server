// Global array of all connected users
const users: Array<{ socketid: string, username: string, room: string }> = [];

/**
 * Add a user to the global array
 * @param socketid id of the socketio socket
 * @param username name of the user
 * @param room name of the streamer/room
 * @returns the user as {socketid, username, room}
 */
function addUser(socketid: string, username: string, room: string) {
    const user = { socketid, username, room };
    users.push(user);

    return user;
}

/**
 * Remove a user from the global array
 * @param socketid id of the socketio socket of the user
 * @returns the removed user, or null if they don't exist
 */
function removeUser(socketid: string) {
    const index = users.findIndex(user => user.socketid === socketid);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
    return null;
}

/**
 * Get a user from their socketid
 * @param socketid id of the socketio socket of the user
 * @returns the user as {socketid, username, room}
 */
function getUser(socketid: string) {
    return users.find(user => user.socketid === socketid);
}

/**
 * Get all the users that are in a room
 * @param room name of the room
 */
function getRoomUsers(room: string) {
    return users.filter(user => user.room === room);
}

/**
 * Get all the users connected to the server
 * @returns the users global array
 */
function getAllUsers() {
    return users;
}

export {
    addUser,
    removeUser,
    getUser,
    getRoomUsers,
    getAllUsers
}