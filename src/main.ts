import { useRegisterSW } from "virtual:pwa-register/vue";
import ui from "@nuxt/ui/vue-plugin";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

useRegisterSW({ immediate: true });

createApp(App).use(router).use(ui).mount("#app");
