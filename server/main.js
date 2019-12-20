const io = require("socket.io")(3000)

io.on("connection", (socket) => {
  socket.emit("chat-message", "connection established");
  socket.on("chat-message", (data) => {
    socket.broadcast.emit("chat-message", data);
  });
})
