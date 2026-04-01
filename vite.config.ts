import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { analyzer } from "vite-bundle-analyzer";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		analyzer({
			analyzerPort: 8889,
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
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
