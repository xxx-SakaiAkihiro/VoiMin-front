import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    content: [],
    login_user: [],
    firebaseUser: null,
  },
  mutations: {
    /**
     * 音声入力の内容を格納する
     * @param {*} Content 議事録内容
     */
    setContent(state, Content) {
      state.content.push(Content);
    },
    setLoginUser(state, user) {
      state.login_user = user;
    },
    setFirebaseUser(state, user) {
      state.firebaseUser = user;
    },
  },
  actions: {
    /**
     * 音声入力の内容を格納する
     * @param {*} Content 議事録内容
     */
    setContent({ commit }, Content) {
      commit("setContent", Content);
    },
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
