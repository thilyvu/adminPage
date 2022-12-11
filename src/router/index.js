import { createRouter, createWebHashHistory } from "vue-router";

import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";

import Dashboard from "../views/Dashboard.vue";
import Icons from "../views/Icons.vue";
// import Maps from "../views/Maps.vue";
import Profile from "../views/UserProfile.vue";
import Classes from "../views/Classes.vue";
import Calendar from "../views/Calendar.vue";
import Comment from "../views/Comment.vue";
import Exercise from "../views/Exercise.vue";
import FileFolder from "../views/FileFolder.vue";
import Lecture from "../views/Lecture.vue";
import NewFeed from "../views/NewFeed.vue";
import Score from "../views/Score.vue";
import Test from "../views/Test.vue";
import User from "../views/User.vue";

import Login from "../views/Login.vue";
import VueCookies from "vue-cookies";
import Register from "../views/Register.vue";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        components: { default: Dashboard },
        beforeEnter: (to, from, next) => {
          if (VueCookies.get("token") !== null) {
            next();
          } else {
            next("/login");
          }
        },
      },
      {
        path: "/icons",
        name: "icons",
        components: { default: Icons },
        beforeEnter: (to, from, next) => {
          if (VueCookies.get("token") !== null) {
            next();
          } else {
            next("/login");
          }
        },
      },
      // {
      //   path: "/maps",
      //   name: "maps",
      //   components: { default: Maps },
      // },
      {
        path: "/profile",
        name: "profile",
        components: { default: Profile },
        beforeEnter: (to, from, next) => {
          if (VueCookies.get("token") !== null) {
            next();
          } else {
            next("/login");
          }
        },
      },
      {
        path: "/classes",
        name: "classes",
        components: { default: Classes },
        beforeEnter: (to, from, next) => {
          if (VueCookies.get("token") !== null) {
            next();
          } else {
            next("/login");
          }
        },
      },
      {
        path: "/Calendars",
        name: "Calendars",
        components: { default: Calendar },
        beforeEnter: (to, from, next) => {
          if (VueCookies.get("token") !== null) {
            next();
          } else {
            next("/login");
          }
        },
      },
      {
        path: "/Comments",
        name: "Comments",
        components: { default: Comment },
        beforeEnter: (to, from, next) => {
          if (VueCookies.get("token") !== null) {
            next();
          } else {
            next("/login");
          }
        },
      },
      {
        path: "/Exercises",
        name: "Exercises",
        components: { default: Exercise },
        beforeEnter: (to, from, next) => {
          if (VueCookies.get("token") !== null) {
            next();
          } else {
            next("/login");
          }
        },
      },
      {
        path: "/FileManagement",
        name: "FileManagement",
        components: { default: FileFolder },
        beforeEnter: (to, from, next) => {
          if (VueCookies.get("token") !== null) {
            next();
          } else {
            next("/login");
          }
        },
      },
      {
        path: "/Lectures",
        name: "Lectures",
        components: { default: Lecture },
        beforeEnter: (to, from, next) => {
          if (VueCookies.get("token") !== null) {
            next();
          } else {
            next("/login");
          }
        },
      },
      {
        path: "/NewFeeds",
        name: "NewFeeds",
        components: { default: NewFeed },
        beforeEnter: (to, from, next) => {
          if (VueCookies.get("token") !== null) {
            next();
          } else {
            next("/login");
          }
        },
      },
      {
        path: "/Scores",
        name: "Scores",
        components: { default: Score },
        beforeEnter: (to, from, next) => {
          if (VueCookies.get("token") !== null) {
            next();
          } else {
            next("/login");
          }
        },
      },
      {
        path: "/Tests",
        name: "Tests",
        components: { default: Test },
        beforeEnter: (to, from, next) => {
          if (VueCookies.get("token") !== null) {
            next();
          } else {
            next("/login");
          }
        },
      },
      {
        path: "/Users",
        name: "Users",
        components: { default: User },
        beforeEnter: (to, from, next) => {
          if (VueCookies.get("token") !== null) {
            next();
          } else {
            next("/login");
          }
        },
      },
    ],
  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        components: { default: Login },
      },
      {
        path: "/register",
        name: "register",
        components: { default: Register },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
});

export default router;
