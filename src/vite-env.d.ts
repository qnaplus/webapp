/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/vue" />

interface ImportMetaEnv {
	readonly VITE_APP_NAME: string;
	readonly VITE_QNAPLUS_API: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
