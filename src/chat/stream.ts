type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | null {
	if (typeof value !== "object" || value === null) return null;
	return value as JsonRecord;
}

function openAiDelta(parsed: JsonRecord): string {
	const choices = parsed.choices;
	if (!Array.isArray(choices) || choices.length === 0) return "";
	const delta = asRecord(asRecord(choices[0])?.delta);
	const content = delta?.content;
	return typeof content === "string" ? content : "";
}

/** Pull assistant text from a Workers AI / OpenAI-style SSE JSON payload. */
export function extractDeltaText(data: string): string {
	if (data === "[DONE]") return "";
	try {
		const parsed = asRecord(JSON.parse(data));
		if (!parsed) return "";
		if (typeof parsed.response === "string") return parsed.response;
		return openAiDelta(parsed);
	} catch {
		return "";
	}
}

function* deltasFromBuffer(chunk: string): Generator<string> {
	for (const line of chunk.split("\n")) {
		const trimmed = line.trim();
		if (!trimmed.startsWith("data:")) continue;
		const text = extractDeltaText(trimmed.slice(5).trim());
		if (text) yield text;
	}
}

type ByteReadable = {
	getReader(): {
		read(): Promise<{ done: boolean; value?: Uint8Array }>;
	};
};

/** Yield text deltas from a chat SSE body. */
export async function* readChatStream(
	body: ByteReadable,
): AsyncGenerator<string> {
	const reader = body.getReader();
	const decoder = new TextDecoder();
	let buffer = "";

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		buffer += decoder.decode(value, { stream: true });
		const parts = buffer.split("\n");
		buffer = parts.pop() ?? "";
		yield* deltasFromBuffer(parts.join("\n"));
	}

	if (buffer.trim()) yield* deltasFromBuffer(buffer);
}
