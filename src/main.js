import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import firebase from "firebase";
import VModal from "vue-js-modal";
import VueLoading from 'vue-loading-template'
import "@fortawesome/fontawesome-free/css/all.css";

Vue.config.productionTip = false;
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
Vue.use(VueAxios, axios, VModal,VueLoading);

// bootstrap-vueのインポート
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB9CYN-3nfBC2zYL18B2GEzHRizymhjWe0",
  authDomain: "voimin-front.firebaseapp.com",
  databaseURL: "https://voimin-front.firebaseio.com",
  projectId: "voimin-front",
  storageBucket: "voimin-front.appspot.com",
  messagingSenderId: "159523083120",
  appId: "1:159523083120:web:6f8af4ae8f0583381e75b5",
  measurementId: "G-YM4S29QQXT",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  axios,
  render: (h) => h(App),
}).$mount("#app");
