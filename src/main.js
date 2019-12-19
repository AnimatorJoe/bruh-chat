import Vue from 'vue'
import App from './App.vue'
import router from './router'
const io = require('socket.io-client')

const socket = io('http://localhost:3000')
socket.on('chat-message', (data) => {
  console.log(data)
})





Vue.config.productionTip = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
