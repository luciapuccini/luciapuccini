import assert from "node:assert/strict";
import { test } from "node:test";
import { handleChat, SESSION_BUDGET } from "./chat.ts";
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

function mockAi(): { ai: AiBinding; callCount: () => number } {
	let callCount = 0;
	return {
		callCount: () => callCount,
		ai: {
			async run() {
				callCount += 1;
				return textStream(["ok"]);
			},
		},
	};
}

function chatRequest(sessionId: string): Request {
	return new Request("http://localhost/api/chat", {
		method: "POST",
		headers: {
			"content-type": "application/json",
			origin: "http://localhost:3000",
		},
		body: JSON.stringify({
			sessionId,
			messages: [{ role: "user", content: "Who is Lucia?" }],
		}),
	});
}

test("Worker allows the 8th user message for a session", async () => {
	const store = new Map<string, number>();
	const { ai, callCount } = mockAi();
	const sessionId = "session-eight";

	for (let i = 0; i < SESSION_BUDGET; i += 1) {
		const response = await handleChat(chatRequest(sessionId), ai, store);
		assert.equal(response.status, 200, `turn ${i + 1} should succeed`);
	}

	assert.equal(callCount(), SESSION_BUDGET);
});

test("Worker rejects the 9th user message without calling the model", async () => {
	const store = new Map<string, number>();
	const { ai, callCount } = mockAi();
	const sessionId = "session-nine";

	for (let i = 0; i < SESSION_BUDGET; i += 1) {
		const response = await handleChat(chatRequest(sessionId), ai, store);
		assert.equal(response.status, 200);
	}

	const capped = await handleChat(chatRequest(sessionId), ai, store);
	assert.equal(capped.status, 429);
	assert.equal(callCount(), SESSION_BUDGET);

	const body = (await capped.json()) as { error?: string; code?: string };
	assert.equal(body.code, "budget_exhausted");
	assert.match(body.error ?? "", /budget|exhausted|questions/i);
});

test("Worker gives a fresh sessionId a fresh budget", async () => {
	const store = new Map<string, number>();
	const { ai, callCount } = mockAi();

	for (let i = 0; i < SESSION_BUDGET; i += 1) {
		const response = await handleChat(chatRequest("session-a"), ai, store);
		assert.equal(response.status, 200);
	}

	const capped = await handleChat(chatRequest("session-a"), ai, store);
	assert.equal(capped.status, 429);

	const fresh = await handleChat(chatRequest("session-b"), ai, store);
	assert.equal(fresh.status, 200);
	assert.equal(callCount(), SESSION_BUDGET + 1);
});
