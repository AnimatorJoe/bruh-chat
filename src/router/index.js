import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import About from "../views/About.vue"
import Register from "../views/Register.vue"
import Login from "../views/Login.vue"
import Profile from "../views/Profile.vue"
import AuthOnly from "../views/AuthOnly.vue"
import firebase from "firebase/app";
import "firebase/auth";
import store from "../store/index.js";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile
  },
  {
    path: "/authonly",
    name: "authonly",
    component: AuthOnly,
    meta: {requiresAuth: true},
  },
]

const router = new VueRouter({
  routes
})

// prevent unauthenticated users from accessing pages requiring authentication
router.beforeEach((to, from, next) => {
  const reqAuth = to.matched.some(record => record.meta.requiresAuth);
  console.log(!store.state.loggedIn);
  console.log("from");
  console.log(from);
  console.log("to");
  console.log(to);
  if(!store.state.loggedIn && reqAuth) {
    next("/login");
  } else {
    next();
  }
})

export default router
