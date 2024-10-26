import "@fontsource/montserrat";
import { PrimeVue } from "@primevue/core";
import { data_craft_init } from "data_craft_core";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import theme from "./theme";

data_craft_init();

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: theme,
    options: {
      darkModeSelector: false,
      cssLayer: {
        name: "primevue",
        order: "tailwind-base, primevue, tailwind-utilities",
      },
    },
  },
});

app.mount("#app");
