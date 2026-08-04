import { CHAT_CONTEXT } from "./chat-context.ts";

export type ChatRole = "system" | "user" | "assistant";

export type ChatMessage = {
	role: ChatRole;
	content: string;
};

export type AiRunInput = {
	messages: ChatMessage[];
	stream: boolean;
	max_tokens?: number;
};

export const MAX_OUTPUT_TOKENS = 512;
export const SESSION_BUDGET = 8;

export type SessionBudgetStore = Map<string, number>;

const defaultSessionStore: SessionBudgetStore = new Map();

export type AiBinding = {
	run(
		model: string,
		input: AiRunInput,
	): Promise<ReadableStream | Response | string>;
};

const MODEL = "@cf/openai/gpt-oss-20b";

const SYSTEM_PROMPT = [
	"You are Ask Lucia on Lucia Puccini's portfolio site.",
	"Answer only from the context pack below.",
	"If the answer is not in the pack, say you do not know from the portfolio and suggest LinkedIn, email, or the CV when useful.",
	"Do not invent jobs, salary, phone numbers, or other private facts.",
	"Refuse off-topic or general-purpose requests that are not about Lucia's portfolio.",
	"Match the user's language (e.g. Spanish in, Spanish out; English in, English out).",
	"Keep answers brief: about one short paragraph or a tight list.",
	"",
	"## Context pack",
	CHAT_CONTEXT,
].join("\n");

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

function parseSessionId(body: unknown): string | null {
	if (typeof body !== "object" || body === null) return null;
	const sessionId = (body as Record<string, unknown>).sessionId;
	if (typeof sessionId !== "string" || sessionId.trim() === "") return null;
	return sessionId;
}

export function rejectBudget(origin: string): Response {
	return Response.json(
		{
			error: "Session question budget exhausted",
			code: "budget_exhausted",
		},
		{ status: 429, headers: corsHeaders(origin) },
	);
}

/** Consume one user-message slot. Returns false when the session is already at cap. */
export function tryConsumeSessionBudget(
	store: SessionBudgetStore,
	sessionId: string,
): boolean {
	const used = store.get(sessionId) ?? 0;
	if (used >= SESSION_BUDGET) return false;
	store.set(sessionId, used + 1);
	return true;
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
	sessionStore: SessionBudgetStore = defaultSessionStore,
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

	const sessionId = parseSessionId(body);
	if (!sessionId) {
		return Response.json(
			{ error: "sessionId is required" },
			{ status: 400, headers: corsHeaders(origin) },
		);
	}

	if (!tryConsumeSessionBudget(sessionStore, sessionId)) {
		return rejectBudget(origin);
	}

	const withSystem: ChatMessage[] = [
		{ role: "system", content: SYSTEM_PROMPT },
		...messages.filter((m) => m.role !== "system"),
	];

	const result = await ai.run(MODEL, {
		messages: withSystem,
		stream: true,
		max_tokens: MAX_OUTPUT_TOKENS,
	});

	return new Response(toStream(result), {
		headers: {
			"content-type": "text/event-stream; charset=utf-8",
			"cache-control": "no-cache",
			...corsHeaders(origin),
		},
	});
}
