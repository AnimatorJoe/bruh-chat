const io = require("socket.io")(3000)

const users = {};

io.on("connection", (socket) => {
  socket.emit("connection-check", "connection established");
  socket.on("chat-message", (data) => {
    socket.broadcast.emit("chat-message", data);
  });
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });
  socket.on("disconnect", () => {
    console.log(users[socket.id] + " disconnected")
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id]
  });
})
