const admin = require("./services/firebase-services");
const express = require("express");
const cors = require("cors");
const checkIfAuthenticated = require("./services/auth.middleware.js");
const socketAuth = require("socketio-auth");
const users = {};
const authenticatedConnections = [];
const guestConnections = [];

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

io.on("connection", (socket) => {
  socket.broadcast.emit("connection-check", "connection established");
  socket.on("chat-message", (data) => {
    console.log(data);
    socket.broadcast.emit("chat-message", data);
  });
  socket.on("new-user", (name) => {
    console.log(name + " connected - socket id: " + socket.id);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });
  socket.on("disconnect", () => {
    console.log(users[socket.id] + " disconnected - socket id: " + socket.id);
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
    delete authenticatedConnections[socket.id];
    delete guestConnections[socket.id];
  });
});

socketAuth(io, {
  authenticate: async function (socket, data, callback) {
    try {
      //get credentials sent by the client
      const { token, loggedIn} = data;
      if(loggedIn) {
        const userInfo = await admin.auth().verifyIdToken(token);
        socket.emit("connection-check", "authenticaion complete, socket now listed as authenticated");
        authenticatedConnections.push(socket.id);
      } else {
        socket.emit("connection-check", "entering as guest user, socket now listed as guest");
        guestConnections.push(socket.id);
      }
      return callback(null, true);
    } catch (err) {
      delete authenticatedConnections[socket.id];
      socket.emit("connection-check", ("authentication failed:\n" + err));
      return callback(err);
    }
  },
  postAuthenticate: function (socket, data) {
    console.log("it's chill");
  },

  timeout: "none"
});

