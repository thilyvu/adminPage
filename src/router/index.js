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
import User from "../views/User.vue";

import Login from "../views/Login.vue";
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
      },
      {
        path: "/icons",
        name: "icons",
        components: { default: Icons },
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
      },
      {
        path: "/classes",
        name: "classes",
        components: { default: Classes },
      },
      {
        path: "/Calendars",
        name: "Calendars",
        components: { default: Calendar },
      },
      {
        path: "/Comments",
        name: "Comments",
        components: { default: Comment },
      },
      {
        path: "/Exercises",
        name: "Exercises",
        components: { default: Exercise },
      },
      {
        path: "/FileManagement",
        name: "FileManagement",
        components: { default: FileFolder },
      },
      {
        path: "/Lectures",
        name: "Lectures",
        components: { default: Lecture },
      },
      {
        path: "/NewFeeds",
        name: "NewFeeds",
        components: { default: NewFeed },
      },
      {
        path: "/Scores",
        name: "Scores",
        components: { default: Score },
      },
      {
        path: "/Users",
        name: "Users",
        components: { default: User },
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
