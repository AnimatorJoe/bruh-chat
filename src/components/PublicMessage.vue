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
      <div class="form-item">
        <input type="text" v-model="message" id="message-input">
      </div>
      <button class="button" type="submit" @click="sendMessage" id="send-button">
        Send
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

    if(this.$store.state.loggedIn) {
      this.name = this.$store.state.user.email;
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

.button {
    background-color: #333;
    color: #fff;
    padding: 10px 30px;
    border: none;
}

.button:hover {
    background-color:#555;
}

.container {
    width: 50%;
    margin: auto;
}

.general-form .form-item {
    padding-bottom: 15px;
}

.general-form input[type = "text"], .general-form textarea {
    padding: 8px;
    width: 100%;
}

.message-render {
    padding: 0px;
    padding: 10px 10px 15px 10px;
    background-color: #fff;
}

.message-render ul {
    padding: 0px;
    /* border: 1px #555 solid; */
    padding: 0px;
    list-style: none;
}

</style>