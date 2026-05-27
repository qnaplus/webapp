/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/react" />

interface ImportMetaEnv {
	readonly VITE_APP_NAME: string;
	readonly VITE_QNAPLUS_API: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
