import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    loggedIn: false
  },
  mutations: {
    changeCurrentUser(state, user) {
      state.user = user;
      state.loggedIn = !!user;
    }
  },
  actions: {
  },
  modules: {
  }
})


