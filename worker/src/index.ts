import { handleChat } from "./chat.ts";

export type Env = {
	AI: {
		run(
			model: string,
			input: {
				messages: Array<{ role: string; content: string }>;
				stream: boolean;
			},
		): Promise<ReadableStream | Response>;
	};
};

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		if (url.pathname === "/api/chat" || url.pathname === "/") {
			if (request.method === "OPTIONS") {
				return new Response(null, { status: 204 });
			}
			return handleChat(request, env.AI);
		}
		return new Response("Not found", { status: 404 });
	},
};
