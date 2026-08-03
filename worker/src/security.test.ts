import assert from "node:assert/strict";
import { test } from "node:test";
import { handleChat } from "./chat.ts";
import type { AiBinding } from "./chat.ts";

function textStream(chunks: string[]): ReadableStream<Uint8Array> {
	const encoder = new TextEncoder();
	return new ReadableStream({
		start(controller) {
			for (const chunk of chunks) {
				controller.enqueue(encoder.encode(chunk));
			}
			controller.close();
		},
	});
}

function mockAi(): { ai: AiBinding; called: () => boolean } {
	let called = false;
	return {
		called: () => called,
		ai: {
			async run() {
				called = true;
				return textStream(["ok"]);
			},
		},
	};
}

function chatRequest(origin: string | null): Request {
	const headers: Record<string, string> = {
		"content-type": "application/json",
	};
	if (origin !== null) headers.origin = origin;
	return new Request("http://localhost/api/chat", {
		method: "POST",
		headers,
		body: JSON.stringify({
			messages: [{ role: "user", content: "Who is Lucia?" }],
		}),
	});
}

test("Worker rejects chat from a disallowed origin without calling the model", async () => {
	const { ai, called } = mockAi();
	const response = await handleChat(
		chatRequest("https://evil.example"),
		ai,
	);

	assert.equal(response.status, 403);
	assert.equal(called(), false);
	const body = (await response.json()) as { error?: string; code?: string };
	assert.equal(body.code, "origin_denied");
	assert.match(body.error ?? "", /origin/i);
});

test("Worker accepts localhost origin at the security gate and streams", async () => {
	const { ai, called } = mockAi();
	const response = await handleChat(chatRequest("http://localhost:3000"), ai);

	assert.equal(response.status, 200);
	assert.equal(called(), true);
	assert.equal(
		response.headers.get("access-control-allow-origin"),
		"http://localhost:3000",
	);
	assert.match(
		response.headers.get("access-control-allow-methods") ?? "",
		/POST/,
	);
});

test("Worker accepts production site origin at the security gate", async () => {
	const { ai, called } = mockAi();
	const response = await handleChat(
		chatRequest("https://luciapuccini.com"),
		ai,
	);

	assert.equal(response.status, 200);
	assert.equal(called(), true);
	assert.equal(
		response.headers.get("access-control-allow-origin"),
		"https://luciapuccini.com",
	);
});

test("Worker rejects chat with no Origin header without calling the model", async () => {
	const { ai, called } = mockAi();
	const response = await handleChat(chatRequest(null), ai);

	assert.equal(response.status, 403);
	assert.equal(called(), false);
	const body = (await response.json()) as { code?: string };
	assert.equal(body.code, "origin_denied");
});

test("OPTIONS preflight for allowed origin returns CORS allow headers", async () => {
	const { default: worker } = await import("./index.ts");
	const { ai } = mockAi();
	const response = await worker.fetch(
		new Request("http://localhost/api/chat", {
			method: "OPTIONS",
			headers: {
				origin: "https://luciapuccini.com",
				"access-control-request-method": "POST",
			},
		}),
		{ AI: ai },
	);

	assert.equal(response.status, 204);
	assert.equal(
		response.headers.get("access-control-allow-origin"),
		"https://luciapuccini.com",
	);
	assert.match(
		response.headers.get("access-control-allow-methods") ?? "",
		/POST/,
	);
});

test("OPTIONS preflight for disallowed origin is rejected", async () => {
	const { default: worker } = await import("./index.ts");
	const { ai } = mockAi();
	const response = await worker.fetch(
		new Request("http://localhost/api/chat", {
			method: "OPTIONS",
			headers: {
				origin: "https://evil.example",
				"access-control-request-method": "POST",
			},
		}),
		{ AI: ai },
	);

	assert.equal(response.status, 403);
	assert.equal(response.headers.get("access-control-allow-origin"), null);
});
