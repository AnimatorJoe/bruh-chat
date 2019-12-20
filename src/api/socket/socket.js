// const io = require("socket.io-client")
import io from "socket.io-client"

const socket = io("http://localhost:3000")
// socket.on("chat-message", (data) => {
//   console.log(data)
// });

// export
export default {
  sendMessage(type, value) {
    socket.emit(type, value);
  },
  messageHandler(type, callback) {
    socket.on(type, callback);
  }
}