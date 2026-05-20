import { ThemeProvider } from "next-themes";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.tsx";
import "./theme/globals.css";
import "./theme/prose.css";

registerSW({ immediate: true });

if (import.meta.env.MODE === "development") {
	document.documentElement.dataset.mode = "dev";
}

const container = document.getElementById("root");
if (container === null) {
	throw new Error("Root container #root not found");
}

createRoot(container).render(
	<StrictMode>
		<ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
			<App />
		</ThemeProvider>
	</StrictMode>,
);
