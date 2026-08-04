## Problem Statement

Portfolio visitors who want to understand Lucia’s experience must scroll long timeline and role sections, or open a one-shot “Quick insight” that only generates a short bio summary. That flow is not interactive, does not answer specific questions (stack, projects, roles, availability handoff), and does little to keep people on the site. Existing text packs for machines (`llms-full.txt`, `cv-homepage.md`) are stale and scattered, so they are not a safe brain for a public assistant. Cost must stay low, and a public chat endpoint must not become an open cross-site abuse or unsafe-content surface.

## Solution

Replace Quick Insight with **Ask Lucia**: a homepage chat in a shared full-screen modal. Visitors open it from the desktop sidebar slot or the mobile nav, see a short welcome and suggestion chips, then ask up to eight questions per browser tab session. Answers stream from a Cloudflare Worker that calls Workers AI (`gpt-oss-20b`), grounded only in a curated static pack (CV, projects, public contact). When the budget is used, the UI stops input and points people to LinkedIn, email, and the CV. Site-only access and safe rendering protect against cross-site request abuse and XSS from model or user content. Remove the Ollama-based Quick Insight path entirely.

## User Stories

1. As a portfolio visitor on the homepage, I want to open a chat about Lucia from the desktop sidebar, so that I can ask questions without hunting through the page.
2. As a portfolio visitor on a phone, I want an **Ask** control in the nav that opens the same chat, so that mobile and desktop feel like one product.
3. As a portfolio visitor, I want the chat in a full-screen modal, so that the conversation gets focus and is easy to read.
4. As a portfolio visitor, I want desktop and mobile to share one modal implementation, so that behavior and copy stay consistent.
5. As a portfolio visitor, I want a short welcome when the modal opens, so that I understand what the chat is for before I type.
6. As a portfolio visitor, I want tappable suggestion chips, so that I can start useful questions without inventing them.
7. As a portfolio visitor, I want my chip choice to send like a normal user message, so that the flow feels like real chat.
8. As a portfolio visitor, I want answers to stream token by token, so that the chat feels responsive.
9. As a portfolio visitor, I want to ask about specific roles (e.g. Gartner, Nimble, consulting), so that I do not have to read every section.
10. As a portfolio visitor, I want to ask about technical skills and stack choices, so that I can judge fit quickly.
11. As a portfolio visitor, I want to ask about featured projects, so that I can learn what was built without leaving the chat mindset (even if I opened chat from the homepage).
12. As a portfolio visitor, I want to ask how to contact Lucia, so that I get public LinkedIn, GitHub, or email paths that already appear on the site.
13. As a portfolio visitor, I want the assistant to refuse invented jobs, salary, phone numbers, or private facts not in the pack, so that I am not misled.
14. As a portfolio visitor writing in Spanish, I want answers in Spanish, so that I can use my preferred language.
15. As a portfolio visitor writing in English, I want answers in English, so that the default site language still works.
16. As a portfolio visitor, I want answers to stay short (roughly a short paragraph or tight list), so that the chat stays scannable.
17. As a portfolio visitor, I want to see how many of my eight questions remain, so that the limit is unsurprising.
18. As a portfolio visitor, I want only my sends to count toward the eight, so that model replies do not burn my budget.
19. As a portfolio visitor, I want the static welcome text not to count as a question, so that opening the modal is free.
20. As a portfolio visitor who used all eight questions, I want input disabled with a clear message, so that I know the session is over.
21. As a portfolio visitor at the limit, I want links to LinkedIn, email, and the CV, so that I can continue the conversation as a human.
22. As a portfolio visitor, I want a refresh or new tab to start a new session budget, so that a casual return visit is not permanently locked out (tab `sessionId` model).
23. As a portfolio visitor on `/projects`, I do not need Ask Lucia entry points there for v1, so that the feature stays scoped to the homepage.
24. As a hiring manager, I want factual answers grounded in Lucia’s real experience pack, so that I can trust the chat for screening questions.
25. As Lucia (site owner), I want Quick Insight’s one-shot generate flow removed, so that there is a single AI engagement path.
26. As Lucia, I want Ollama client code, dependency, and `/ollama` proxies removed, so that cost and ops stay on one Cloudflare path.
27. As Lucia, I want the chat Worker to live in this repo, so that site, context pack, and API evolve together.
28. As Lucia, I want a hand-maintained `chat-context.md` (or equivalent) for the model, so that stale `llms-*` / CV markdown files are not silently trusted.
29. As Lucia, I want that pack to include CV, projects blurbs, and public contact only (no phone), so that the bot is useful and not over-sharing.
30. As Lucia, I want Durable Objects out of v1, so that session state stays simple and cheap.
31. As Lucia, I want Workers AI `@cf/openai/gpt-oss-20b`, so that inference stays inside Cloudflare at low unit cost.
32. As Lucia, I want a hard max output around 512 tokens, so that one turn cannot runaway on a reasoning model.
33. As Lucia, I want cross-site callers blocked at the Worker, so that other origins cannot drive my bill or abuse the API from a browser.
34. As Lucia, I want CSRF-style cross-site chat requests rejected, so that a malicious page cannot silently spend a visitor’s or my quota via the victim’s browser.
35. As a portfolio visitor, I want assistant output rendered as safe text (not raw HTML), so that XSS via model or pasted content is unlikely.
36. As a developer working locally, I want localhost allowed as an origin in development, so that I can exercise the full stack.
37. As a developer, I want a clear error in the modal when the API rejects the request for security or budget reasons, so that failures are debuggable without opening DevTools first.
38. As a portfolio visitor on a slow network, I want loading/streaming state while the reply arrives, so that I know the app is working.
39. As a portfolio visitor, I want to close the modal and reopen it in the same tab with history still there until refresh (client-held messages), so that I can glance back at the CV underneath without losing the thread for that tab session.
40. As Lucia, I want suggestion chips to steer people toward on-pack topics, so that grounding quality and retention both improve.
41. As Lucia, I want off-topic general assistant use refused, so that the endpoint is not a free general-purpose LLM.
42. As a portfolio visitor who asks something not in the pack, I want an honest “I don’t know from the portfolio” style answer plus a contact handoff when useful, so that the bot does not hallucinate.
43. As Lucia, I want Netlify to keep hosting the static site while Wrangler deploys the Worker, so that existing hosting does not need a full platform migrate.
44. As a future maintainer, I want the feature split into vertical iterations (streaming chat → grounding → budget → security → Ollama teardown), so that each slice can ship and verify on its own.

## Implementation Decisions

### Vertical modules (iterations through UI → HTTP → Worker → LLM)

1. **Streaming Ask Lucia**  
   Homepage desktop trigger (“Ask about Lucia”) and mobile nav (“Ask”) open one shared full-screen modal with transcript and input. Frontend talks to a chat HTTP API (AI SDK-style streaming client). Worker calls Workers AI `@cf/openai/gpt-oss-20b` and returns an SSE/streamed reply. Replaces Quick Insight entry points. First end-to-end slice may use a minimal system prompt until grounding ships.

2. **CV-grounded Q&A**  
   Modal empty state: short welcome + suggestion chips aimed at CV/projects. Worker loads a curated static context pack and applies: answer only from pack; match user language; keep replies brief; max generation ~512 tokens. Pack contents: homepage CV facts, project blurbs, public contact (LinkedIn, GitHub, email). No phone. Do not treat existing stale `llms-*` / `cv-homepage.md` as source of truth; hand-author the pack for chat.

3. **Eight-question session**  
   Frontend creates a tab-scoped `sessionId` (e.g. `sessionStorage`), shows `n/8` for **user** messages only, and disables input at the cap with LinkedIn / email / CV links. API includes `sessionId`. Worker tracks counts in memory and refuses the 9th user message without calling the model. Static welcome does not consume budget; chip sends do. Refresh / new tab ⇒ new session (accepted tradeoff without Durable Objects).

4. **Site-only access (security-first)**  
   Primary concern: reduce XSS and CSRF / cross-site abuse on a public chat API—not “CORS for its own sake.”  
   Means: Worker origin allowlist and strict CORS for the production site (plus localhost in dev); reject browser calls from unexpected origins so other sites cannot drive chat requests (CSRF-style cross-site use) or burn quota.  
   On the UI side of the same slice: render user and assistant content as text (no HTML injection from model output), so reflected/stored XSS via the chat surface is avoided.  
   Modal shows a clear error when the gateway rejects a request for security reasons.

5. **Ollama teardown**  
   Remove Quick Insight’s Ollama browser client, the `ollama` dependency, and Vite/Netlify `/ollama` proxy/redirect configuration once Ask Lucia owns the homepage slots.

### Architectural choices

- **Hosting:** Static site remains on Netlify; chat API is a Cloudflare Worker in the same repository (no Durable Objects in v1).
- **State:** Conversation transcript lives in the browser; Worker is stateless except in-memory quota by `sessionId` (and security checks per request).
- **Model:** Workers AI binding `@cf/openai/gpt-oss-20b` (not a third-party OpenRouter/Groq key for v1).
- **Scope of entry points:** Homepage only; remove or omit Ask controls on `/projects` for v1.
- **Content maintenance:** One new chat context pack maintained by hand when the CV/projects change; unifying the React page onto that pack is out of scope.

### API contract (conceptual)

- Client sends: `sessionId`, prior messages, new user message (AI SDK chat shape acceptable).
- Worker: security checks → quota consume/check → grounded stream, or structured rejection for security failure / budget exhausted.
- Streaming response for successful turns; non-stream error responses for reject paths.

## Testing Decisions

### What makes a good test

Test **external behavior** of a vertical slice: given an HTTP request (and quota/security inputs), assert allow/stream-or-success vs reject. Do not assert internal prompt string formatting, Workers AI SDK call shapes, or React component internals unless they are the security boundary (e.g. “output is not interpreted as HTML” can stay a code review / convention if not automated).

### Modules under test (must-have)

- **Eight-question session:** 8th user message allowed (model path may be mocked); 9th user message capped without invoking the model; new `sessionId` gets a fresh budget.
- **Site-only access (security):** disallowed origin rejected; allowed production/localhost origin accepted for the security gate (downstream LLM may be mocked).

### Not required for v1

- Automated UI/e2e for the modal.
- Live Workers AI integration tests.
- Golden tests for the full system prompt text.
- Ollama teardown tests.

### Prior art

This repo today has little or no automated frontend/Worker test suite around Quick Insight (Ollama is called from the browser component). New tests should be small, assert-style or lightweight unit/integration tests next to the Worker quota/security logic—no new heavy framework unless one is already adopted when implementation starts.

## Out of Scope

- Durable Objects, multi-device session resume, or durable server-side transcripts.
- Chat entry points on the Projects page (desktop or mobile) for v1.
- Unifying homepage React content and `llms-*` / `cv-homepage.md` into one CMS-like source of truth.
- Refreshing or deleting legacy `llms-*` files (unless needed to avoid confusion; not required to ship chat).
- “New chat” button that mints another eight messages without a full tab refresh.
- Per-IP global rate limits beyond origin allowlist + per-tab session budget (may add later).
- Browser-visible shared API secrets as a security control.
- General-purpose assistant behavior, code generation, or off-portfolio tutoring.
- Choosing alternate model providers (OpenRouter, Groq, etc.) unless Workers AI proves unfit after try.
- Phone number or other non-public PII in the model context pack.
- Migrating the marketing site off Netlify onto Cloudflare Pages as part of this work.

## Further Notes

- Original brief mentioned a Llama starting point and Cloudflare Durable Objects + AI SDK; grilled decisions supersede that: **Workers AI `gpt-oss-20b`**, **no Durable Objects**, **AI SDK streaming client** against the Worker, **same-repo Worker**.
- Soft leftover for implementation: exact suggestion-chip wording.
- Cost controls stack: short answers + ~512 max tokens + 8 user messages/session + origin allowlist + no general-purpose use.
- Security slice is intentional product scope: allowlist is a **control** for cross-site abuse/CSRF-style use; safe text rendering is the XSS control on the chat surface. Neither is “extra CORS config” without that framing.
