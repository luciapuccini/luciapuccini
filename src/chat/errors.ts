export class ChatRequestError extends Error {
	readonly code: string | undefined;

	constructor(message: string, code?: string) {
		super(message);
		this.name = "ChatRequestError";
		this.code = code;
	}
}

function readErrorFields(
	bodyText: string,
): { error?: string; code?: string } | null {
	try {
		const parsed: unknown = JSON.parse(bodyText);
		if (typeof parsed !== "object" || parsed === null) return null;
		const record = parsed as Record<string, unknown>;
		return {
			error: typeof record.error === "string" ? record.error : undefined,
			code: typeof record.code === "string" ? record.code : undefined,
		};
	} catch {
		return null;
	}
}

/** Map a non-OK chat API body to a user-facing error. */
export function chatErrorFromBody(
	status: number,
	bodyText: string,
): ChatRequestError {
	const fields = readErrorFields(bodyText);
	if (fields?.code === "origin_denied") {
		const detail = fields.error ?? "Origin not allowed for Ask Lucia chat";
		return new ChatRequestError(
			`Security: ${detail}. Open this chat from luciapuccini.com (or localhost in development).`,
			"origin_denied",
		);
	}
	if (fields?.error) {
		return new ChatRequestError(fields.error, fields.code);
	}
	return new ChatRequestError(
		bodyText.trim() || `Chat request failed (${status})`,
	);
}
