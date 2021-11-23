import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import ArgonDashboard from "./plugins/argon-dashboard";
import "element-plus/lib/theme-chalk/index.css";

const appInstance = createApp(App);
appInstance.use(router);
appInstance.use(ElementPlus);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
