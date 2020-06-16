import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Explanation from "../views/Explanation.vue";
import SaveList from "../views/SaveList.vue";
import SaveDetail from "../views/SaveDetail.vue";
import How from "../views/How.vue";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    //ログインしていたら上記のパスに飛ぶことを許可する
    beforeEnter(to, from, next) {
      if (store.state.loginStatus) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/explanation",
    name: "Explanation",
    component: Explanation,
    //ログインしていたら上記のパスに飛ぶことを許可する
    beforeEnter(to, from, next) {
      if (store.state.loginStatus) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/saveList",
    name: "SaveList",
    component: SaveList,
    //ログインしていたら上記のパスに飛ぶことを許可する
    beforeEnter(to, from, next) {
      if (store.state.loginStatus) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/saveDetail/:rcordingId",
    name: "SaveDetail",
    component: SaveDetail,
    //ログインしていたら上記のパスに飛ぶことを許可する
    beforeEnter(to, from, next) {
      if (store.state.loginStatus) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/how",
    name: "How",
    component: How,
    //ログインしていたら上記のパスに飛ぶことを許可する
    beforeEnter(to, from, next) {
      if (store.state.loginStatus) {
        next();
      } else {
        next("/");
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
