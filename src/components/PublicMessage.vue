<template>
  <div class="container">
    <div class="message-render">
      <ul>
        <li v-for="m in messagesArray" v-bind:key="m.id">
          {{ m }} 
        </li>
      </ul>
    </div>
    <form class = "general-form" @submit.prevent>
      <div class="form-item"><input type="text" v-model="message" id="message-input"></div>
      <button class="button" type="submit" @click="sendMessage" id="send-button">Send</button>
    </form>
  </div>
</template>

<script>
import SocketInterface from "@/api/socket/socket.js";
require("@/assets/styles/chatroom.css");
require("@/assets/styles/forms.css");

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

    if(this.$store.state.loggedIn) {
      this.name = this.$store.state.user.displayName;
    } else {
      this.name = prompt("enter your name, please.");
      while(this.name === "" || this.name === null) {
        this.name = prompt("Bro, do you not know how to read lmao. Let's try again.\nEnter your name, PLEASE.");
      }
    }
    
    this.messagesArray.push("you joined the server");
    SocketInterface.sendMessage("new-user", this.name);
  },
  destroyed() {
    console.log("cleared");
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
      if(this.message === null) return
      SocketInterface.sendMessage("chat-message", {
        message: this.message,
        name: this.name
      });
      this.messagesArray.push(this.name + ": " + this.message);
      this.message = null;
    }
  }
}
</script>

<style scoped>
body {
    /* background-color: #111; */
    padding: 0;
    margin: 0;
    display: flex;
    /* justify-content: center; */
}
</style>