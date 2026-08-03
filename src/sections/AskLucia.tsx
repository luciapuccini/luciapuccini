import { useState } from "react";
import {
	type ClientChatMessage,
	streamChat,
} from "../chat/sendChat";

const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL ?? "/api/chat";

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

export function useAskLuciaChat() {
	const [open, setOpen] = useState(false);
	const [messages, setMessages] = useState<ClientChatMessage[]>([]);
	return { open, setOpen, messages, setMessages };
}

export function AskLuciaNavButton({ onOpen }: { onOpen: () => void }) {
	return (
		<button type="button" className="nav__link ask-lucia-nav-btn" onClick={onOpen}>
			Ask
		</button>
	);
}

export function AskLuciaDesktopButton({ onOpen }: { onOpen: () => void }) {
	return (
		<div className="ask-lucia ask-lucia--desktop">
			<button type="button" className="ask-lucia__open-btn" onClick={onOpen}>
				Ask about Lucia
			</button>
		</div>
	);
}

type ModalProps = {
	open: boolean;
	onClose: () => void;
	messages: ClientChatMessage[];
	setMessages: React.Dispatch<React.SetStateAction<ClientChatMessage[]>>;
};

export function AskLuciaModal({
	open,
	onClose,
	messages,
	setMessages,
}: ModalProps) {
	const [input, setInput] = useState("");
	const [streaming, setStreaming] = useState(false);
	const [error, setError] = useState("");

	const send = async (text: string) => {
		const trimmed = text.trim();
		if (!trimmed || streaming) return;

		const nextMessages: ClientChatMessage[] = [
			...messages,
			{ id: crypto.randomUUID(), role: "user", content: trimmed },
		];
		setMessages(nextMessages);
		setInput("");
		setError("");
		setStreaming(true);
		setMessages([
			...nextMessages,
			{ id: crypto.randomUUID(), role: "assistant", content: "" },
		]);

		try {
			await streamChat({
				apiUrl: CHAT_API_URL,
				messages: nextMessages,
				onDelta: (delta) => {
					setMessages((prev) => {
						const copy = [...prev];
						const last = copy[copy.length - 1];
						if (last?.role === "assistant") {
							copy[copy.length - 1] = {
								...last,
								content: last.content + delta,
							};
						}
						return copy;
					});
				},
			});
		} catch {
			setError("Could not reach Ask Lucia. Try again in a moment.");
		} finally {
			setStreaming(false);
		}
	};

	if (!open) return null;

	return (
		<div className="ask-lucia-modal" role="dialog" aria-modal="true">
			<button
				type="button"
				className="ask-lucia-modal__close"
				onClick={onClose}
				aria-label="Close chat"
			>
				<IconClose />
			</button>
			<div className="ask-lucia-modal__content">
				<h2 className="ask-lucia-modal__title">Ask Lucia</h2>
				<div className="ask-lucia-modal__transcript">
					{messages.length === 0 && !streaming ? (
						<p className="ask-lucia-modal__empty">
							Ask a question about Lucia&apos;s experience.
						</p>
					) : null}
					{messages.map((message) => (
						<div
							key={message.id}
							className={`ask-lucia-modal__bubble ask-lucia-modal__bubble--${message.role}`}
						>
							{message.content ||
								(streaming && message.role === "assistant" ? "…" : null)}
						</div>
					))}
					{streaming ? (
						<p className="ask-lucia-modal__status" aria-live="polite">
							Streaming reply…
						</p>
					) : null}
					{error ? <p className="ask-lucia-modal__error">{error}</p> : null}
				</div>
				<form
					className="ask-lucia-modal__form"
					onSubmit={(event) => {
						event.preventDefault();
						void send(input);
					}}
				>
					<input
						className="ask-lucia-modal__input"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Ask a question…"
						disabled={streaming}
						aria-label="Message"
					/>
					<button
						type="submit"
						className="ask-lucia-modal__send"
						disabled={streaming || !input.trim()}
					>
						{streaming ? "Sending…" : "Send"}
					</button>
				</form>
			</div>
		</div>
	);
}
