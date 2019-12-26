import io from "socket.io-client";
import firebase from "firebase/app";
import store from "@/store";
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
      if(store.state.loggedIn) {
        const token = await firebase.auth().currentUser.getIdToken();
        socket.emit("authentication", {
          loggedIn: true,
          token: token
        });
      } else {
        socket.emit("authentication", {
          loggedIn: false,
          token: null
        });
      }
    } catch (err) {
      console.log(err);
    };
  }
}