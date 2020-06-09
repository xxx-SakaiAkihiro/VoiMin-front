import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login_user: null,
    firebaseUser: null,
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user;
    },
    setFirebaseUser(state, user) {
      state.firebaseUser = user;
    },
  },
  actions: {
    login() {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(google_auth_provider);
    },
    setLoginUser({ commit, user }) {
      commit("setLoginUser", user);
    },
    setFirebaseUser({ commit }, user) {
      commit("setFirebaseUser", user);
    },
  },
  modules: {},
});
