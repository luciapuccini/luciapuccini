const OLLAMA_CHAT_URL = "https://ollama.com/api/chat";
const MODEL = "gemma4:31b-cloud";
const MAX_PAGE_TEXT_LENGTH = 20_000;

const SYSTEM_PROMPT =
	"You write short portfolio bio summaries. Output only the summary — no preamble, no commentary, no meta-text.";

const buildUserPrompt = (pageText: string) =>
	`Write a 2-3 sentence insight about Lucia Puccini based on the following portfolio content. Highlight cross-functional collaboration, product & metrics mindset, and frontend expertise. Use humble, collegial tone (no "leader" framing). Output the insight only — no intro, no explanation.\n\n${pageText}`;

const jsonResponse = (body: Record<string, string>, status: number) =>
	Response.json(body, { status });

const readPageText = async (request: Request): Promise<string | null> => {
	try {
		const body = await request.json();
		const pageText = body?.pageText;
		if (typeof pageText !== "string" || pageText.trim() === "") return null;
		if (pageText.length > MAX_PAGE_TEXT_LENGTH) return null;
		return pageText;
	} catch {
		return null;
	}
};

export default async (request: Request) => {
	if (request.method !== "POST") {
		return jsonResponse({ error: "Method not allowed" }, 405);
	}

	const pageText = await readPageText(request);
	if (pageText === null) {
		return jsonResponse(
			{
				error: `Body must be JSON {pageText: string} with 1 to ${MAX_PAGE_TEXT_LENGTH} characters`,
			},
			400,
		);
	}

	const apiKey = Netlify.env.get("OLLAMA_API_KEY");
	if (!apiKey) {
		return jsonResponse({ error: "OLLAMA_API_KEY is not set" }, 500);
	}

	const upstream = await fetch(OLLAMA_CHAT_URL, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model: MODEL,
			stream: false,
			messages: [
				{ role: "system", content: SYSTEM_PROMPT },
				{ role: "user", content: buildUserPrompt(pageText) },
				{ role: "assistant", content: "Lucia" },
			],
			options: {
				num_predict: 200,
				temperature: 0.7,
				stop: ["Here is", "Note:", "I will", "\n\n"],
			},
		}),
	});

	if (!upstream.ok) {
		const detail = await upstream.text();
		return jsonResponse(
			{ error: `Ollama returned ${upstream.status}: ${detail}` },
			502,
		);
	}

	const data = await upstream.json();
	const insight: string =
		data?.message?.content || data?.message?.thinking || "";
	return jsonResponse({ insight }, 200);
};

export const config = { path: "/api/insight" };
