import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    content: [],
  },
  mutations: {
    /**
     * 音声入力の内容を格納する
     * @param {*} Content 議事録内容
     */
    setContent(state, Content) {
      state.content.push(Content);
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
  },
  modules: {},
});
