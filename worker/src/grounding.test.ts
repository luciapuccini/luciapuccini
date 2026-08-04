import assert from "node:assert/strict";
import { test } from "node:test";
import { handleChat } from "./chat.ts";
import type { AiBinding, AiRunInput } from "./chat.ts";

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

function chatRequest(content: string): Request {
	return new Request("http://localhost/api/chat", {
		method: "POST",
		headers: {
			"content-type": "application/json",
			origin: "http://localhost:3000",
		},
		body: JSON.stringify({
			sessionId: "grounding-test",
			messages: [{ role: "user", content }],
		}),
	});
}

test("POST /api/chat caps generation at about 512 tokens", async () => {
	const runs: AiRunInput[] = [];
	const ai: AiBinding = {
		async run(_model, input) {
			runs.push(input);
			return textStream(["ok"]);
		},
	};

	const response = await handleChat(
		chatRequest("What is your stack?"),
		ai,
		new Map(),
	);

	assert.equal(response.status, 200);
	assert.equal(runs.length, 1);
	assert.equal(runs[0]?.max_tokens, 512);
});

test("POST /api/chat grounds the model in the curated pack", async () => {
	const runs: AiRunInput[] = [];
	const ai: AiBinding = {
		async run(_model, input) {
			runs.push(input);
			return textStream(["ok"]);
		},
	};

	const response = await handleChat(
		chatRequest("Where did you work?"),
		ai,
		new Map(),
	);

	assert.equal(response.status, 200);
	const system = runs[0]?.messages.find((m) => m.role === "system")?.content ?? "";
	assert.match(system, /answer only from/i);
	assert.match(system, /do not invent|refuse|not in the (pack|context)/i);
	assert.match(system, /match.*language|same language/i);
	assert.match(system, /brief|short/i);
	assert.match(system, /Gartner/);
	assert.match(system, /linkedin\.com\/in\/luciapuccini/i);
	assert.match(system, /puccinilucia@gmail\.com/i);
	assert.match(system, /github\.com\/luciapuccini/i);
	assert.match(system, /Farmacia Duret|StrengthSync|CYS Electronics/);
	assert.doesNotMatch(system, /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/);
});
