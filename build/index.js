"use strict";
// based on https://github.com/bradtraversy/chatcord/blob/master/server.js
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
//import * as cors from 'cors';
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const users_1 = require("./users");
// initialize express, socketio
const app = express();
const httpServer = http_1.createServer(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        //origin: ["https://demo.hark.tv", "http://127.0.0.1", "http://localhost"],
        origin: ["http://localhost:3000", "http://127.0.0.1:3000", "https://alpha.hark.tv"],
        credentials: true,
    },
    allowEIO3: true
});
const PORT = process.env.PORT || 4000;
// security
app.disable("x-powered-by");
// enable cors for express
// TODO: update origins
// var corsOptions = {
//     //origin: "http://127.0.0.1:3001",
//     origin: ["https://demo.hark.tv", "http://127.0.0.1:*", "http://localhost:*"],
//     //origin: "*",
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// app.use(cors(corsOptions));
// authentication middleware
io.use((socket, next) => {
    //const token = socket.handshake.auth.token;
    const { auth } = socket.handshake.headers;
    if (auth == "coolsecret") {
        next();
    }
    else {
        next(new Error("invalid auth"));
    }
});
// socket connections
io.on("connection", (socket) => {
    console.log("new connection");
    // User joins room
    socket.on("joinRoom", (username, room) => {
        // if username is already connected to that room, dont let duplicate join
        // const exists = getUserByName(username)
        // if(exists && exists.room === room){
        //     console.log("dup");
        //     socket.disconnect();
        // }
        // add user to the room
        const user = users_1.addUser(socket.id, username, room);
        socket.join(user.room);
        console.log(user.username, "has joined", user.room);
    });
    // User disconnects
    socket.on("disconnect", () => {
        const user = users_1.removeUser(socket.id);
        if (user != null) {
            console.log(user.username, "has disconnected from", user.room);
        }
    });
    // User sends a message
    socket.on('chatMessage', msg => {
        const user = users_1.getUserBySocketId(socket.id);
        // Emit the message to the room
        if ((user === null || user === void 0 ? void 0 : user.username) != null) {
            io.to(user.room).emit('chatMessage', `${user === null || user === void 0 ? void 0 : user.username}: ${msg}`);
            console.log(`[${user === null || user === void 0 ? void 0 : user.room}] ${user === null || user === void 0 ? void 0 : user.username}: ${msg}`);
        }
        // Store the message
    });
});
// temporary routes for testing
app.get("/", (req, res) => res.send("ok"));
app.get("/aga", (req, res) => res.send("agoo"));
app.get("/users/all", (req, res) => {
    const users = users_1.getAllUsers();
    const rooms = users.map((user) => {
        return user.room;
    });
    const roomSet = new Set(rooms);
    let data = [];
    roomSet.forEach((room) => {
        data.push({
            channel: room,
            viewCount: users_1.getRoomUsers(room).length,
        });
    });
    res.status(200).send({
        success: true,
        data: data,
    });
});
// get just the raw number of users in the room
app.get("/viewers/:room", (req, res) => {
    const users = users_1.getRoomUsers(req.params.room);
    res.status(200).send({ viewers: users.length });
    //res.send(getRoomUsers(req.params.room));
});
app.get("/users/:room", (req, res) => {
    res.send(users_1.getRoomUsers(req.params.room));
});
// start the server
httpServer.listen(PORT, () => console.log(`Server running on ${PORT}`));
//# sourceMappingURL=index.js.map