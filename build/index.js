"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
//import * as cors from 'cors';
const http_1 = require("http");
const socket_io_1 = require("socket.io");
// initialize express, socketio
const app = express();
const httpServer = http_1.createServer(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        //origin: ["https://demo.hark.tv", "http://127.0.0.1", "http://localhost"],
        origin: "*"
    }
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
// socket
io.on("connection", (socket) => {
    console.log("new connection");
});
// routing
app.get("/", (req, res) => res.send("awesome server"));
app.get("/aga", (req, res) => res.send("agoo"));
// start the server
//app.listen(PORT, () => console.log(`Server running: https://localhost:${PORT}`));
httpServer.listen(PORT, () => console.log(`Server running on ${PORT}`));
//# sourceMappingURL=index.js.map