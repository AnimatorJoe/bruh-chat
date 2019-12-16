<template>
    <form id = "send-container">
        <input type="text" v-model="text" id="message-input">
        <br>
        <button type="submit" @click="creatPost" id="send-button">
          Post
        </button>
    </form>
</template>

<script>
export default {
  name: "Chatroom",
  data() {
    return {
      posts:[],
      error: "",
      text: ""
    }
  },
  methods: {
    createPost() {

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
#send-container {
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
}
</style>