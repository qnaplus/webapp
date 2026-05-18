import ui from "@nuxt/ui/vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        base: "./",
        publicDir: `public/${mode}`,
        plugins: [
            vue(),
            tailwindcss(),
            ui({
                prose: true,
                ui: {
                    colors: {
                        primary: mode === "development" ? "teal" : "blue",
                        neutral: "zinc",
                    },
                    card: {
                        slots: {
                            header: "sm:px-2",
                            body: "sm:px-2",
                            footer: "sm:p-2",
                        },
                    },
                    icons: {
                        arrowDown: 'i-ph-arrow-down',
                        arrowLeft: 'i-ph-arrow-left',
                        arrowRight: 'i-ph-arrow-right',
                        arrowUp: 'i-ph-arrow-up',
                        caution: 'i-ph-warning-circle',
                        check: 'i-ph-check',
                        chevronDoubleLeft: 'i-ph-caret-double-left',
                        chevronDoubleRight: 'i-ph-caret-double-right',
                        chevronDown: 'i-ph-caret-down',
                        chevronLeft: 'i-ph-caret-left',
                        chevronRight: 'i-ph-caret-right',
                        chevronUp: 'i-ph-caret-up',
                        close: 'i-ph-x',
                        copy: 'i-ph-copy',
                        copyCheck: 'i-ph-check-circle',
                        dark: 'i-ph-moon',
                        drag: 'i-ph-dots-six-vertical',
                        ellipsis: 'i-ph-dots-three',
                        error: 'i-ph-x-circle',
                        external: 'i-ph-arrow-up-right',
                        eye: 'i-ph-eye',
                        eyeOff: 'i-ph-eye-slash',
                        file: 'i-ph-file',
                        folder: 'i-ph-folder',
                        folderOpen: 'i-ph-folder-open',
                        hash: 'i-ph-hash',
                        info: 'i-ph-info',
                        light: 'i-ph-sun',
                        loading: 'i-ph-circle-notch',
                        menu: 'i-ph-list',
                        minus: 'i-ph-minus',
                        panelClose: 'i-ph-caret-left',
                        panelOpen: 'i-ph-caret-right',
                        plus: 'i-ph-plus',
                        reload: 'i-ph-arrow-counter-clockwise',
                        search: 'i-ph-magnifying-glass',
                        stop: 'i-ph-square',
                        success: 'i-ph-check-circle',
                        system: 'i-ph-monitor',
                        tip: 'i-ph-lightbulb',
                        upload: 'i-ph-upload',
                        warning: 'i-ph-warning'
                    }
                },
            }),
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
                },
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
