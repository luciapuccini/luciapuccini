import assert from "node:assert/strict";
import { test } from "node:test";
import { extractDeltaText, readChatStream } from "../../src/chat/stream.ts";

test("extractDeltaText reads Workers AI response field", () => {
	assert.equal(extractDeltaText('{"response":"Hi"}'), "Hi");
});

test("extractDeltaText reads OpenAI-style delta content", () => {
	assert.equal(
		extractDeltaText('{"choices":[{"delta":{"content":" there"}}]}'),
		" there",
	);
});

test("readChatStream accumulates SSE text deltas", async () => {
	const encoder = new TextEncoder();
	const stream = new ReadableStream<Uint8Array>({
		start(controller) {
			controller.enqueue(
				encoder.encode('data: {"response":"Hello"}\n\ndata: {"response":"!"}\n\n'),
			);
			controller.close();
		},
	});

	const chunks: string[] = [];
	for await (const chunk of readChatStream(stream)) {
		chunks.push(chunk);
	}
	assert.deepEqual(chunks, ["Hello", "!"]);
});
