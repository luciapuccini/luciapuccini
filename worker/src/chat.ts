export type ChatRole = "system" | "user" | "assistant";

export type ChatMessage = {
	role: ChatRole;
	content: string;
};

export type AiRunInput = {
	messages: ChatMessage[];
	stream: boolean;
};

export type AiBinding = {
	run(
		model: string,
		input: AiRunInput,
	): Promise<ReadableStream | Response | string>;
};

const MODEL = "@cf/openai/gpt-oss-20b";

const SYSTEM_PROMPT =
	"You are Ask Lucia, a helpful assistant on Lucia Puccini's portfolio site. Answer briefly.";

/** Production site + local Vite ports. Control for cross-site / CSRF-style browser abuse. */
export const ALLOWED_ORIGINS = new Set([
	"https://luciapuccini.com",
	"https://www.luciapuccini.com",
	"http://localhost:3000",
	"http://127.0.0.1:3000",
	"http://localhost:4173",
	"http://127.0.0.1:4173",
]);

export function isAllowedOrigin(origin: string | null): origin is string {
	return origin !== null && ALLOWED_ORIGINS.has(origin);
}

export function corsHeaders(origin: string): HeadersInit {
	return {
		"access-control-allow-origin": origin,
		"access-control-allow-methods": "POST, OPTIONS",
		"access-control-allow-headers": "content-type",
		vary: "Origin",
	};
}

export function rejectOrigin(): Response {
	return Response.json(
		{
			error: "Origin not allowed for Ask Lucia chat",
			code: "origin_denied",
		},
		{ status: 403 },
	);
}

function isChatMessage(value: unknown): value is ChatMessage {
	if (typeof value !== "object" || value === null) return false;
	const msg = value as Record<string, unknown>;
	return (
		(msg.role === "user" || msg.role === "assistant" || msg.role === "system") &&
		typeof msg.content === "string"
	);
}

function parseMessages(body: unknown): ChatMessage[] | null {
	if (typeof body !== "object" || body === null) return null;
	const messages = (body as Record<string, unknown>).messages;
	if (!Array.isArray(messages) || messages.length === 0) return null;
	if (!messages.every(isChatMessage)) return null;
	return messages;
}

function toStream(
	result: ReadableStream | Response | string,
): ReadableStream {
	if (typeof result === "string") {
		return new ReadableStream({
			start(controller) {
				controller.enqueue(new TextEncoder().encode(result));
				controller.close();
			},
		});
	}
	if (result instanceof Response) {
		return result.body ?? new ReadableStream({ start: (c) => c.close() });
	}
	return result;
}

export async function handleChat(
	request: Request,
	ai: AiBinding,
): Promise<Response> {
	if (request.method !== "POST") {
		return new Response("Method not allowed", { status: 405 });
	}

	const origin = request.headers.get("origin");
	if (!isAllowedOrigin(origin)) {
		return rejectOrigin();
	}

	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return Response.json(
			{ error: "Invalid JSON" },
			{ status: 400, headers: corsHeaders(origin) },
		);
	}

	const messages = parseMessages(body);
	if (!messages) {
		return Response.json(
			{ error: "messages array with role/content is required" },
			{ status: 400, headers: corsHeaders(origin) },
		);
	}

	const withSystem: ChatMessage[] = [
		{ role: "system", content: SYSTEM_PROMPT },
		...messages.filter((m) => m.role !== "system"),
	];

	const result = await ai.run(MODEL, {
		messages: withSystem,
		stream: true,
	});

	return new Response(toStream(result), {
		headers: {
			"content-type": "text/event-stream; charset=utf-8",
			"cache-control": "no-cache",
			...corsHeaders(origin),
		},
	});
}
