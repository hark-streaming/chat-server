// based on https://github.com/bradtraversy/chatcord/blob/master/server.js

import * as express from "express";
//import * as cors from 'cors';
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { addUser, removeUser, getUser, getRoomUsers, getAllUsers } from "./users";

// initialize express, socketio
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        //origin: ["https://demo.hark.tv", "http://127.0.0.1", "http://localhost"],
        origin: ["http://localhost:3000", "http://127.0.0.1:3000", "https://*.hark.tv"],
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
io.use((socket: Socket, next) => {
    //const token = socket.handshake.auth.token;
    const { auth } = socket.handshake.headers;
    if (auth == "coolsecret") {
        next();
    } else {
        next(new Error("invalid auth"));
    }
});

// socket connections
io.on("connection", (socket: Socket) => {
    console.log("new connection");

    // User joins room
    socket.on("joinRoom", (username: string, room: string) => {
        // add user to the room
        const user = addUser(socket.id, username, room);
        socket.join(user.room);
        console.log(user.username, "has joined", user.room);
    });

    // User disconnects
    socket.on("disconnect", () => {
        const user = removeUser(socket.id);
        if (user != null) {
            console.log(user.username, "has disconnected from", user.room);
        }
    });

    // User sends a message
    socket.on('chatMessage', msg => {
        const user = getUser(socket.id);

        // Emit the message to the room
        if (user != null) {
            io.to(user.room).emit('chatMessage', `${user?.username}: ${msg}`);
            console.log(`[${user?.room}] ${user?.username}: ${msg}`);
        }

        // Store the message

    });

});


// temporary routes for testing
app.get("/", (req: express.Request, res: express.Response) => res.send("ok"));

app.get("/aga", (req: express.Request, res: express.Response) => res.send("agoo"));

app.get("/users/all", (req: express.Request, res: express.Response) => {
    console.log("called");
    const users = getAllUsers();
    const rooms = users.map((user) => {
        return user.room;
    });

    let data: Array<Object> = [];
    rooms.forEach((room) => {
        data.push({
            channel: room,
            viewCount: getRoomUsers(room).length,
        });
    })

    res.status(200).send({
        success: true,
        data: data,
    });
});

app.get("/users/:room", (req: express.Request, res: express.Response) => {
    res.send(getRoomUsers(req.params.room));
});

// start the server
httpServer.listen(PORT, () => console.log(`Server running on ${PORT}`));
