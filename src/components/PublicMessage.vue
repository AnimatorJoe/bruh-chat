<template>
  <div>
    <div id="message-container">
      <ul>
        <li v-for="m in messagesArray" v-bind:key="m.id"> {{ m }} </li>
      </ul>
    </div>
    <form id = "send-container" @submit.prevent="onSubmit">
      <input type="text" v-model="message" id="message-input">
      <br>
      <button type="submit" @click="sendMessage" id="send-button" @submit.prevent="onSubmit">
        Post
      </button>
    </form>
  </div>
</template>

<script>
import SocketInterface from "@/api/socket/socket.js";
// import prompt from "prompt-async";

export default {
  name: "PublicMessage",
  created() {
    // defining call backs for message reception
    SocketInterface.messageHandler("chat-message", (data) => {
      this.messagesArray.push(data.name + ": " + data.message);
    });

    SocketInterface.messageHandler("user-joined", (data) => {
      this.messagesArray.push(data + " joined the server");
    });

    SocketInterface.messageHandler("user-disconnected", (name) => {
      this.messagesArray.push(name + " left the server");
    });

    this.name = prompt("enter your name, please.");
    this.messagesArray.push("you joined the server");
    SocketInterface.sendMessage("new-user", this.name);
  },
  destroyed() {
    // SocketInterface.sendMessage("delete-user", this.name);
  },
  data() {
    return {
      messagesArray:[],
      error: null,
      message: null,
      name: null
    }
  },
  methods: {
    sendMessage() {
      SocketInterface.sendMessage("chat-message", {
        message: this.message,
        name: this.name
      });
      this.messagesArray.push("you: " + this.message);
      this.message = null;
    }
  }
}
</script>

<style scoped>
body {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
}
#message-container {
    width: 80%;
    max-width: 1200px;
}
#message-container div {
    background-color: #CCC;
    padding: 5px;
}
#message-container div:nth-child(2n) {
    background-color: #FFF;
}
/* #send-container {
    position: fixed;
    padding-bottom: 30px;
    bottom: 0;
    background-color: white;
    max-width: 1200px;
    width: 80%;
    display: flex;
}
#message-input {
    flex-grow: 1;
} */
</style>