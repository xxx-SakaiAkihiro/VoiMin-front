import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false;
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  vuetify,
  axios,
  render: (h) => h(App),
}).$mount("#app");
