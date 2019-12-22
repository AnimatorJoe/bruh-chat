import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import firebase from "firebase/app";
import firebaseConfig from "./firebase/firebaseConfig.js";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

Vue.prototype.$axios = axios;
Vue.config.productionTip = true;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
