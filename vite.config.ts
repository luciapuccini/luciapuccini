import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api/ollama": {
				target: "https://ollama.com",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api\/ollama/, "/api"),
				headers: {
					Authorization: `Bearer ${process.env.OLLAMA_API_KEY ?? ""}`,
				},
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {},
		},
	},
});
