const admin = require("./services/firebase-services");
const express = require("express");
const cors = require("cors");
const checkIfAuthenticated = require("./services/auth.middleware.js");

const users = {};
const authenticatedConnections = {};

// setting up express server
const app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.send("Server Is On");
});

app.get("/profile", checkIfAuthenticated, async(req, res) => {
  try {
    res.send("urmom");
  } catch(err) {
    console.log(err);
  }
});

let port = process.env.PORT || 3001;
app.listen(port, () => {"Express server running on port " + port})

// setting up socket.io
const io = require("socket.io")(3000);

require("socketio-auth")(io, {
  authenticate: async function (socket, data) {
    try {
      //get credentials sent by the client
      const { authToken } = data;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      socket.emit("connection-check", "Authenticaion complete, socket now listed as authenticated");
      authenticatedConnections.push(socket.id);
    } catch (err) {
      socket.emit("connection-check", ("authentication failed:\n" + err));
    }
  }
});

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
    console.log(users[socket.id] + " disconnected");
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
    delete authenticatedConnections[socket.io];
  });
});

