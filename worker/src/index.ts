import {
	corsHeaders,
	handleChat,
	isAllowedOrigin,
	rejectOrigin,
	type AiBinding,
} from "./chat.ts";

export type Env = {
	AI: AiBinding;
};

export function handleOptions(request: Request): Response {
	const origin = request.headers.get("origin");
	if (!isAllowedOrigin(origin)) {
		return rejectOrigin();
	}
	return new Response(null, {
		status: 204,
		headers: corsHeaders(origin),
	});
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		if (url.pathname === "/api/chat" || url.pathname === "/") {
			if (request.method === "OPTIONS") {
				return handleOptions(request);
			}
			return handleChat(request, env.AI);
		}
		return new Response("Not found", { status: 404 });
	},
};
