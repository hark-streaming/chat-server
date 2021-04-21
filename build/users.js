"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getRoomUsers = exports.getUserByName = exports.getUserBySocketId = exports.removeUser = exports.addUser = void 0;
// Global array of all connected users
const users = [];
/**
 * Add a user to the global array
 * @param socketid id of the socketio socket
 * @param username name of the user
 * @param room name of the streamer/room
 * @returns the user as {socketid, username, room}
 */
function addUser(socketid, username, room) {
    const user = { socketid, username, room };
    users.push(user);
    return user;
}
exports.addUser = addUser;
/**
 * Remove a user from the global array
 * @param socketid id of the socketio socket of the user
 * @returns the removed user, or null if they don't exist
 */
function removeUser(socketid) {
    const index = users.findIndex(user => user.socketid === socketid);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
    return null;
}
exports.removeUser = removeUser;
/**
 * Get a user from their socketid
 * @param socketid id of the socketio socket of the user
 * @returns the user as {socketid, username, room}
 */
function getUserBySocketId(socketid) {
    return users.find(user => user.socketid === socketid);
}
exports.getUserBySocketId = getUserBySocketId;
function getUserByName(username) {
    return users.find(user => user.username === username);
}
exports.getUserByName = getUserByName;
/**
 * Get all the users that are in a room
 * @param room name of the room
 */
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}
exports.getRoomUsers = getRoomUsers;
/**
 * Get all the users connected to the server
 * @returns the users global array
 */
function getAllUsers() {
    return users;
}
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=users.js.map