import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import ArgonDashboard from "./plugins/argon-dashboard";
import "element-plus/lib/theme-chalk/index.css";
// import firebase from "firebase/app";
// var firebaseConfig = {
//   apiKey: "AIzaSyDSETgpFozFIMO7BViJdyRSnP7_yYbm-E8",
//   authDomain: "adminpage-6d061.firebaseapp.com",
//   projectId: "adminpage-6d061",
//   storageBucket: "adminpage-6d061.appspot.com",
//   messagingSenderId: "957586414434",
//   appId: "1:957586414434:web:c950adf6a770cfc05e2a3b",
//   measurementId: "G-QGJ2MFC4ND",
// };
// firebase.initializeApp(firebaseConfig);
const appInstance = createApp(App);
appInstance.use(router);
appInstance.use(ElementPlus);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
