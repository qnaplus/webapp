import { useRegisterSW } from "virtual:pwa-register/vue";
import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";
import PrimeVue from "primevue/config";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Tooltip from "primevue/tooltip";

useRegisterSW({ immediate: true });

const primary = import.meta.env.MODE === "development" ? "teal" : "blue";

const preset = definePreset(Aura, {
	semantic: {
		primary: {
			50: `{${primary}.50}`,
			100: `{${primary}.100}`,
			200: `{${primary}.200}`,
			300: `{${primary}.300}`,
			400: `{${primary}.400}`,
			500: `{${primary}.500}`,
			600: `{${primary}.600}`,
			700: `{${primary}.700}`,
			800: `{${primary}.800}`,
			900: `{${primary}.900}`,
			950: `{${primary}.950}`,
		},
		colorScheme: {
			light: {
				surface: {
					0: "#ffffff",
					50: "{zinc.50}",
					100: "{zinc.100}",
					200: "{zinc.200}",
					300: "{zinc.300}",
					400: "{zinc.400}",
					500: "{zinc.500}",
					600: "{zinc.600}",
					700: "{zinc.700}",
					800: "{zinc.800}",
					900: "{zinc.900}",
					950: "{zinc.950}",
				},
			},
			dark: {
				surface: {
					0: "#ffffff",
					50: "{zinc.50}",
					100: "{zinc.100}",
					200: "{zinc.200}",
					300: "{zinc.300}",
					400: "{zinc.400}",
					500: "{zinc.500}",
					600: "{zinc.600}",
					700: "{zinc.700}",
					800: "{zinc.800}",
					900: "{zinc.900}",
					950: "{zinc.950}",
				},
			},
		},
	},
});

createApp(App)
	.use(PrimeVue, {
		// Default theme configuration
		theme: {
			preset,
			options: {
				prefix: "p",
				darkModeSelector: ".dark",
			},
		},
	})
    .directive("tooltip", Tooltip)
	.use(router)
	.mount("#app");
