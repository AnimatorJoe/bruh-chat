import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import firebase from "firebase/app";
import firebaseConfig from "./firebase/firebaseConfig.js";
import store from "./store";
import SocketInterface from "@/api/socket/socket.js";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
firebase.auth().onAuthStateChanged(user => {
  console.log("Auth state change");
  console.log(user);
  store.commit("changeCurrentUser", user);
  SocketInterface.authSocket();
  // App init
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
})

// Vue prototypes and settings
Vue.prototype.$axios = axios;
Vue.config.productionTip = true;

