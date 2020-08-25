import Vue from "vue";
import VueRouter from "vue-router";
import App from "../components/App.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: App
  }
];

const router = new VueRouter({
  routes
});

export default router;
