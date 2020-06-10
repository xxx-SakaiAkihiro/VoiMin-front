import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
// import Explanation from "../views/ExplanationModal.vue";
import SaveList from "../views/SaveList.vue";
import SaveDetail from "../views/SaveDetail.vue";
import How from "../views/How.vue";

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
  },
  // {
  //   path: "/explanation",
  //   name: "Explanation",
  //   component: Explanation,
  // },
  {
    path: "/saveList",
    name: "SaveList",
    component: SaveList,
  },
  {
    path: "/saveDetail",
    name: "SaveDetail",
    component: SaveDetail,
  },
  {
    path: "/how",
    name: "How",
    component: How,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
