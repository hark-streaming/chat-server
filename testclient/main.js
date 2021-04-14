const socket = io("http://localhost:4000/", {
    auth: {
        token: "coolsecret"
    }
});
socket.on('connect', () => {
    socket.emit('joinRoom', "testman", "testroom");
});

const chatForm = document.getElementById('chat-form');
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    // Get message text
    let msg = e.target.elements.msg.value;
  
    msg = msg.trim();
  
    if (!msg) {
      return false;
    }
  
    // Emit message to server
    socket.emit('chatMessage', msg);
  
    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
  });
