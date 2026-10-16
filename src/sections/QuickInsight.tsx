import { useState } from "react";

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
			const response = await fetch("/api/insight", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ pageText }),
			});
			const data: { insight?: string; error?: string } = await response
				.json()
				.catch(() => ({}));

			if (!response.ok) {
				setError(
					`Could not generate an insight (${response.status}). ${data.error ?? "Please try again later."}`,
				);
				return;
			}
			setInsight(data.insight ?? "");
		} catch {
			setError("Could not reach the insight service. Check your connection.");
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
