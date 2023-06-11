import { createApp } from "vue";
import "@/styles/index.scss";
import App from "./App.vue";
import { useREM } from "@/utils/flexible";
import store from "./store";

const app = createApp(App);
useREM();
app.use(store).mount("#app");
