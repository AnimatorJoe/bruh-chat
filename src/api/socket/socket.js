import io from "socket.io-client";
import firebase from "firebase/app";
import "firebase/auth";

const socket = io("http://localhost:3000");
socket.on("connection-check", async (data) => {
  console.log("Connection Check - Message From Server:\n" + data + "\n" + Date());
});

// export
export default {
  sendMessage(type, value) {
    socket.emit(type, value);
  },
  messageHandler(type, callback) {
    socket.on(type, callback);
  },
  async authSocket() {
    try {
      const token = await firebase.auth().currentUser.getIdToken();
      socket.emit("authentication", {
        token: token
      });
    } catch (err) {
      console.log(err);
    };
  }
}