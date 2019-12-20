<template>
  <div>
    <div id="message-container">
        <ul>
          <li v-for="m in messagesArray"> {{ m + '.' }} </li>
        </ul>
    </div>
    <form id = "send-container">
        <input type="text" v-model="message" id="message-input">
        <br>
        <button type="submit" @click="sendMessage" id="send-button">
          Post
        </button>
    </form>
  </div>
</template>

<script>
import SocketInterface from "@/api/socket/socket.js"

export default {
  name: "PublicMessage",
  created() {


    // defining call backs for message reception
    SocketInterface.messageHandler("chat-message", (data) => {
      this.messagesArray.push(data);
      console.log(this.messagesArray);
    });


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
      SocketInterface.sendMessage("chat-message", this.message);
      this.messagesArray.push(this.message);
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