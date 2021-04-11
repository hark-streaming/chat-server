const socket = io("http://localhost:4000/");
socket.on('connect', function (data) {
    socket.emit('join', 'Hello World from client');
});