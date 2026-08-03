import assert from "node:assert/strict";
import { test } from "node:test";
import { handleChat } from "./chat.ts";
import type { AiBinding, ChatMessage } from "./chat.ts";

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

async function readBody(response: Response): Promise<string> {
	return response.text();
}

test("POST /api/chat streams assistant reply from Workers AI", async () => {
	const calls: Array<{ model: string; messages: ChatMessage[] }> = [];
	const ai: AiBinding = {
		async run(model, input) {
			calls.push({ model, messages: input.messages });
			assert.equal(input.stream, true);
			return textStream(["Hello", " Lucia"]);
		},
	};

	const body = {
		messages: [{ role: "user", content: "Who is Lucia?" }],
	};
	const request = new Request("http://localhost/api/chat", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(body),
	});

	const response = await handleChat(request, ai);

	assert.equal(response.status, 200);
	assert.match(
		response.headers.get("content-type") ?? "",
		/text\/event-stream/,
	);
	assert.equal(calls.length, 1);
	assert.equal(calls[0]?.model, "@cf/openai/gpt-oss-20b");
	assert.equal(calls[0]?.messages[0]?.role, "system");
	assert.equal(calls[0]?.messages.at(-1)?.content, "Who is Lucia?");

	const text = await readBody(response);
	assert.match(text, /Hello/);
	assert.match(text, /Lucia/);
});

test("POST /api/chat rejects empty messages without calling the model", async () => {
	let called = false;
	const ai: AiBinding = {
		async run() {
			called = true;
			return textStream([]);
		},
	};

	const response = await handleChat(
		new Request("http://localhost/api/chat", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ messages: [] }),
		}),
		ai,
	);

	assert.equal(response.status, 400);
	assert.equal(called, false);
});
