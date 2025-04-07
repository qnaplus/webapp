import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		base: "./",
		publicDir: `public/${mode}`,
		plugins: [
			vue(),
			tailwindcss(),
			VitePWA({
				registerType: "autoUpdate",
				injectRegister: "auto",
				manifest: {
					id: "battlesquid.qnaplus",
					name: "qnaplus",
					short_name: "qnaplus",
					description: "Advanced search tool for the VEX Robotics Q&A",
					theme_color: "#18181b",
					background_color: "#121212",
					icons: [
						{
							src: "icons/qnaplus-64x64.png",
							sizes: "64x64",
							type: "image/png",
						},
						{
							src: "icons/qnaplus-180x180.png",
							sizes: "180x180",
							type: "image/png",
						},
						{
							src: "icons/qnaplus-192x192.png",
							sizes: "192x192",
							type: "image/png",
						},
						{
							src: "icons/qnaplus-512x512.png",
							sizes: "512x512",
							type: "image/png",
						},
						{
							src: "icons/qnaplus.svg",
							sizes: "512x512",
							type: "image/svg+xml",
						},
					],
				},

				workbox: {
					globPatterns: ["**/*.{js,css,html,svg,png,ico,woff,woff2,eot,ttf}"],
					cleanupOutdatedCaches: true,
					clientsClaim: true,
					ignoreURLParametersMatching: [/^v/],
				},

				devOptions: {
					enabled: false,
					navigateFallback: "index.html",
					suppressWarnings: true,
					type: "module",
				},
			}),
			Components({
				dts: true,
				resolvers: [
					PrimeVueResolver()
				]
			}),
		],
		build: {
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (id.includes("node_modules")) {
							const modulePath = id.split("node_modules/")[1];
							const topLevelFolder = modulePath?.split("/")[0];
							if (topLevelFolder !== ".pnpm") {
								return topLevelFolder;
							}

							const scopedPackageName = modulePath?.split("/")[1];
							const chunkName =
								scopedPackageName?.split("@")[
								scopedPackageName.startsWith("@") ? 1 : 0
								];

							return chunkName;
						}
					},
				},
			},
		},
	};
});
