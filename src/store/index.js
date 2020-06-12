import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    content: [],
    loginUser: {
      userId: 0,
      userName: "",
      mailAddress: "",
      registerDate: "",
      statusId: 0,
    },
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
    /**
     * ログインしてるユーザーをstateにセットする
     * @param {*} user ユーザー
     */
    setLoginUser(state, user) {
      state.loginUser = user;
    },
    /**
     * firebaseの情報をstateにセットする
     * @param {*} user ユーザー
     */
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
    /**
     * Google認証ログインを使ってログイン作業をする
     */
    login() {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(google_auth_provider);
    },
    /**
     * ログインしてるユーザーをstateにセットする
     * @param {*} user ユーザー
     */
    setLoginUser({ commit }, user) {
      commit("setLoginUser", user);
    },
    /**
     * firebaseの情報をstateにセットする
     * @param {*} user ユーザー
     */
    setFirebaseUser({ commit }, user) {
      commit("setFirebaseUser", user);
    },
  },
  getters: {
    /**
     * ログインユーザーの名前を取得する
     */
    userName: (state) => (state.loginUser ? state.loginUser.userName : ""),
  },
});
