import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler", {}]],
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		port:3000,
		proxy: {
			"/ollama": {
				target: "https://ollama.com",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/ollama/, ""),
			},
		},
	},
	css: {
		preprocessorOptions: {
			scss: {},
		},
	},
});
