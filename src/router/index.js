import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import About from "../views/About.vue"
import Register from "../views/Register.vue"
import Login from "../views/Login.vue"
import Profile from "../views/Profile.vue"

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
]

const router = new VueRouter({
  routes
})

export default router
