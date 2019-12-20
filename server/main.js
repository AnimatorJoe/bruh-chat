const io = require("socket.io")(3000)

io.on("connection", (socket) => {
  socket.emit("connection-check", "connection established");
  socket.on("chat-message", (data) => {
    socket.broadcast.emit("chat-message", data);
  });
  socket.on("new-user", (data) => {
    socket.broadcast.emit("new-user", data);
  });
})
