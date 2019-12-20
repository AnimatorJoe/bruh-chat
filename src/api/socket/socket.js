// const io = require("socket.io-client")
import io from "socket.io-client"
const socket = io("http://localhost:3000")
socket.on("connection-check", (data) => {
  console.log("Connection Check - Message From Server:\n" + data + "\n" + Date());
});

// export
export default {
  sendMessage(type, value) {
    socket.emit(type, value);
  },
  messageHandler(type, callback) {
    socket.on(type, callback);
  }
}