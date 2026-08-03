import { readChatStream } from "./stream";

export type ClientChatMessage = {
	id: string;
	role: "user" | "assistant";
	content: string;
};

export type StreamChatOptions = {
	apiUrl: string;
	messages: ClientChatMessage[];
	onDelta: (text: string) => void;
	signal?: AbortSignal;
};

/** POST messages to the chat Worker and stream assistant text via onDelta. */
export async function streamChat({
	apiUrl,
	messages,
	onDelta,
	signal,
}: StreamChatOptions): Promise<void> {
	const response = await fetch(apiUrl, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			messages: messages.map(({ role, content }) => ({ role, content })),
		}),
		signal,
	});

	if (!response.ok) {
		const detail = await response.text().catch(() => "");
		throw new Error(detail || `Chat request failed (${response.status})`);
	}

	if (!response.body) {
		throw new Error("Chat response had no body");
	}

	for await (const chunk of readChatStream(response.body)) {
		onDelta(chunk);
	}
}
