import { Ollama } from "ollama/browser";
import { useState } from "react";

const ollama = new Ollama({
	host: `${window.location.origin}/ollama`,
	headers: {
		Authorization: `Bearer ${import.meta.env.VITE_OLLAMA_API_KEY}`,
	},
});
const MODEL = "gemma4:31b-cloud";

const SYSTEM_PROMPT = `You write short portfolio bio summaries. Output only the summary — no preamble, no commentary, no meta-text.`;

const IconClose = () => (
	<svg
		aria-hidden="true"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<title>Close</title>
		<line x1="18" y1="6" x2="6" y2="18" />
		<line x1="6" y1="6" x2="18" y2="18" />
	</svg>
);

const QuickInsight = ({ mode }: { mode: "desktop" | "mobile" }) => {
	const [insight, setInsight] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [modalOpen, setModalOpen] = useState(false);

	const generate = async () => {
		setInsight("");
		setError("");
		setLoading(true);

		const pageText =
			document.querySelector(".layout__content")?.textContent?.trim() ?? "";

		try {
			const response = await ollama.chat({
				model: MODEL,
				messages: [
					{ role: "system", content: SYSTEM_PROMPT },
					{
						role: "user",
						content: `Write a 2-3 sentence insight about Lucia Puccini based on the following portfolio content. Highlight cross-functional collaboration, product & metrics mindset, and frontend expertise. Use humble, collegial tone (no "leader" framing). Output the insight only — no intro, no explanation.\n\n${pageText}`,
					},
					{ role: "assistant", content: "Lucia" },
				],
				options: {
					num_predict: 200,
					temperature: 0.7,
					stop: ["Here is", "Note:", "I will", "I'll", "\n\n"],
				},
			});

			const msg = response.message as unknown as {
				content: string;
				thinking?: string;
			};
			setInsight(msg.content || msg.thinking || "");
		} catch {
			setError("Could not reach Ollama. Is it running?");
		} finally {
			setLoading(false);
		}
	};

	const handleMobileClick = () => {
		setModalOpen(true);
		generate();
	};

	const insightBody = (
		<>
			{loading && (
				<div className="quick-insight__skeleton">
					<div className="quick-insight__skeleton-line" />
					<div className="quick-insight__skeleton-line quick-insight__skeleton-line--short" />
				</div>
			)}
			{insight && <p className="quick-insight__text">{insight}</p>}
			{error && <p className="quick-insight__error">{error}</p>}
		</>
	);

	if (mode === "desktop") {
		return (
			<div className="quick-insight quick-insight--desktop">
				<h3 className="quick-insight__title">✨ Quick insight</h3>
				{insightBody}
				<button
					type="button"
					className="quick-insight__btn"
					onClick={generate}
					disabled={loading}
				>
					{loading ? "Generating..." : "Generate"}
				</button>
			</div>
		);
	}

	return (
		<>
			<button
				type="button"
				className="nav__link quick-insight-nav-btn"
				onClick={handleMobileClick}
			>
				✨ Quick Insight
			</button>

			{modalOpen && (
				<div className="quick-insight-modal">
					<button
						type="button"
						className="quick-insight-modal__close"
						onClick={() => setModalOpen(false)}
					>
						<IconClose />
					</button>
					<div className="quick-insight-modal__content">
						<h3 className="quick-insight__title">✨ Quick insight</h3>
						{insightBody}
						<button
							type="button"
							className="quick-insight__btn"
							onClick={generate}
							disabled={loading}
						>
							{loading ? "Regenerate" : "Generate"}
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default QuickInsight;
