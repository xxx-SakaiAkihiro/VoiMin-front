import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recordingList: [],
    content: [],
    loginUser: {
      userId: 0,
      userName: "",
      mailAddress: "",
      registerDate: "",
      statusId: 0,
    },
    firebaseUser: null,
    loginStatus: false,
    token:"",
  },
  mutations: {
    /**
     *録音記録Listを格納する
     * @param {*} recordingList 録音記録List
     */
    setRecordingList(state, recordingList) {
      state.recordingList = recordingList;
    },
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
    /**
     * ログイン状態を切り替えるメソッド
     * @param {*} isLogin ログイン状態
     */
    switchLoginStatus(state, isLogin) {
      state.loginStatus = isLogin;
    },
    /* トークンをセットするメソッド.
     * @param {*} token トークン 
     */
    setToken(state,token){
      state.token = token
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
     * 録音記録Listを格納する
     * @param {*} recordingList 録音記録List
     */
    setRecordingList({ commit }, recordingList) {
      commit("setRecordingList", recordingList);
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
    /**
     * ログイン状態を切り替えるメソッド
     * @components/login/Login.vue
     * @components/common/Logout.vue
     * @param {*} isLogin ログイン状態(true ログインしている / false ログインしていない)
     */
    switchLoginStatus({ commit }, isLogin) {
      commit("switchLoginStatus", isLogin);
    },
    /**
     * tokenをstateにセットする
     * @param {*} token トークン
     */
    setToken({commit},token){
      commit("setToken",token);
    },
  },
  getters: {
    /**
     * ログインユーザーの名前を取得する
     */
    userName: (state) => (state.loginUser ? state.loginUser.userName : ""),
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })], // オプションを追加
});
