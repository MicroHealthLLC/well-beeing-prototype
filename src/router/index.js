import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/activities",
    name: "Activities",
    component: () =>
      import(/* webpackChunkName: "activities" */ "../views/Activities.vue"),
  },
  {
    path: "/health",
    name: "Health",
    component: () =>
      import(/* webpackChunkName: "health" */ "../views/Health.vue"),
  },
  {
    path: "/time",
    name: "Time",
    component: () => import(/* webpackChunkName: "time" */ "../views/Time.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
