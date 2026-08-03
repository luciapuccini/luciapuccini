## Parent PRD

`issues/prd.md`

## What to build

End-to-end **Streaming Ask Lucia**: homepage desktop trigger (“Ask about Lucia”) and mobile nav (“Ask”) open one shared full-screen modal with transcript and input; the client streams against a same-repo Cloudflare Worker that calls Workers AI `@cf/openai/gpt-oss-20b`. Replace Quick Insight entry points on the homepage. Scope chat to the homepage only (no Ask entry on `/projects` in this slice). Minimal system prompt is fine until grounding ships. See PRD **Solution**, module **Streaming Ask Lucia**, and architectural choices (Netlify site + Worker, no Durable Objects).

## Acceptance criteria

- [x] Homepage desktop sidebar slot and mobile nav open the same full-screen chat modal
- [x] User can send a message and see a streamed assistant reply from Workers AI `gpt-oss-20b` via the Worker
- [x] Conversation history is held in the client for the tab (close/reopen modal keeps messages until refresh)
- [x] Loading/streaming state is visible while a reply arrives
- [x] Ask Lucia is not added to `/projects` (and any Quick Insight control there is removed or omitted as part of homepage-only scope)
- [x] Worker lives in this repository and is deployable with Wrangler alongside the existing Netlify site

## Blocked by

None - can start immediately

## User stories addressed

- User story 1
- User story 2
- User story 3
- User story 4
- User story 8
- User story 23
- User story 27
- User story 31
- User story 38
- User story 39
- User story 43
- User story 25 (partial: homepage entry points become Ask Lucia)

## Done notes

- Tracer: `worker/` with `handleChat` + mocked AI tests; Vite proxies `/api/chat` → wrangler `:8787`.
- UI: shared `useAskLuciaChat` state on homepage; Quick Insight component removed (ollama dep/proxy left for issue 005).
- Next: grounding (003), session budget (004), site-only security (002), then Ollama teardown (005). Deploy Worker with Cloudflare account + AI binding before live streaming works in prod.
