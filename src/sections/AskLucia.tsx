import { useState } from "react";
import {
	ChatRequestError,
	type ClientChatMessage,
	streamChat,
} from "../chat/sendChat";

const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL ?? "/api/chat";
const SESSION_BUDGET = 8;
const SESSION_STORAGE_KEY = "ask-lucia-session-id";

const LINKEDIN_URL = "https://www.linkedin.com/in/luciapuccini/";
const EMAIL_URL = "mailto:puccinilucia@gmail.com";
const CV_URL = new URL("../assets/Lucia_Puccini_Resume.pdf", import.meta.url)
	.href;

const WELCOME =
	"Ask about Lucia's roles, skills, projects, or how to get in touch. Answers stay grounded in her portfolio.";

const SUGGESTION_CHIPS = [
	"What did you do at Gartner?",
	"What is your tech stack?",
	"Tell me about your projects",
	"How can I contact you?",
] as const;

function getOrCreateSessionId(): string {
	const existing = sessionStorage.getItem(SESSION_STORAGE_KEY);
	if (existing) return existing;
	const id = crypto.randomUUID();
	sessionStorage.setItem(SESSION_STORAGE_KEY, id);
	return id;
}

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

function errorMessage(err: unknown): string {
	if (err instanceof ChatRequestError) return err.message;
	return "Could not reach Ask Lucia. Try again in a moment.";
}

function userMessageCount(messages: ClientChatMessage[]): number {
	return messages.filter((m) => m.role === "user").length;
}

function BudgetLabel({ used }: { used: number }) {
	const remaining = Math.max(0, SESSION_BUDGET - used);
	return (
		<p className="ask-lucia-modal__budget" aria-live="polite">
			{`${used}/${SESSION_BUDGET} questions used · ${remaining} left`}
		</p>
	);
}

function CapHandoff() {
	return (
		<div className="ask-lucia-modal__capped" role="status">
			<p>
				You used all {SESSION_BUDGET} questions in this tab. Continue the
				conversation here:
			</p>
			<ul className="ask-lucia-modal__handoff">
				<li>
					<a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
						LinkedIn
					</a>
				</li>
				<li>
					<a href={EMAIL_URL}>Email</a>
				</li>
				<li>
					<a href={CV_URL} download>
						CV (EN)
					</a>
				</li>
			</ul>
		</div>
	);
}

function EmptyState({
	disabled,
	onChip,
}: {
	disabled: boolean;
	onChip: (chip: string) => void;
}) {
	return (
		<div className="ask-lucia-modal__empty">
			<p className="ask-lucia-modal__welcome">{WELCOME}</p>
			<fieldset className="ask-lucia-modal__chips" aria-label="Suggested questions">
				{SUGGESTION_CHIPS.map((chip) => (
					<button
						key={chip}
						type="button"
						className="ask-lucia-modal__chip"
						disabled={disabled}
						onClick={() => onChip(chip)}
					>
						{chip}
					</button>
				))}
			</fieldset>
		</div>
	);
}

function Transcript({
	messages,
	streaming,
	error,
	atCap,
	onChip,
}: {
	messages: ClientChatMessage[];
	streaming: boolean;
	error: string;
	atCap: boolean;
	onChip: (chip: string) => void;
}) {
	return (
		<div className="ask-lucia-modal__transcript">
			{messages.length === 0 && !streaming ? (
				<EmptyState disabled={streaming || atCap} onChip={onChip} />
			) : null}
			{messages.map((message) => (
				<div
					key={message.id}
					className={`ask-lucia-modal__bubble ask-lucia-modal__bubble--${message.role}`}
				>
					{/* Plain text only — never HTML from model or user content */}
					{message.content ||
						(streaming && message.role === "assistant" ? "…" : null)}
				</div>
			))}
			{streaming ? (
				<p className="ask-lucia-modal__status" aria-live="polite">
					Streaming reply…
				</p>
			) : null}
			{error ? (
				<p className="ask-lucia-modal__error" role="alert">
					{error}
				</p>
			) : null}
			{atCap ? <CapHandoff /> : null}
		</div>
	);
}

function ChatForm({
	input,
	streaming,
	onInput,
	onSend,
}: {
	input: string;
	streaming: boolean;
	onInput: (value: string) => void;
	onSend: () => void;
}) {
	return (
		<form
			className="ask-lucia-modal__form"
			onSubmit={(event) => {
				event.preventDefault();
				onSend();
			}}
		>
			<input
				className="ask-lucia-modal__input"
				value={input}
				onChange={(e) => onInput(e.target.value)}
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
	);
}

export function AskLuciaModal({
	open,
	onClose,
	messages,
	setMessages,
}: ModalProps) {
	const [input, setInput] = useState("");
	const [streaming, setStreaming] = useState(false);
	const [error, setError] = useState("");
	const [sessionId] = useState(getOrCreateSessionId);
	const [budgetForcedCap, setBudgetForcedCap] = useState(false);

	const used = userMessageCount(messages);
	const atCap = budgetForcedCap || used >= SESSION_BUDGET;

	const send = async (text: string) => {
		const trimmed = text.trim();
		if (!trimmed || streaming || atCap) return;

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
				sessionId,
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
		} catch (err) {
			if (err instanceof ChatRequestError && err.code === "budget_exhausted") {
				setBudgetForcedCap(true);
			}
			setError(errorMessage(err));
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
				<div className="ask-lucia-modal__header">
					<h2 className="ask-lucia-modal__title">Ask Lucia</h2>
					<BudgetLabel used={used} />
				</div>
				<Transcript
					messages={messages}
					streaming={streaming}
					error={error}
					atCap={atCap}
					onChip={(chip) => void send(chip)}
				/>
				{atCap ? null : (
					<ChatForm
						input={input}
						streaming={streaming}
						onInput={setInput}
						onSend={() => void send(input)}
					/>
				)}
			</div>
		</div>
	);
}
