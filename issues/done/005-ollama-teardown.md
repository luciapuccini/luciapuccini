## Parent PRD

`issues/prd.md`

## What to build

**Ollama teardown** once Ask Lucia owns the homepage slots: remove the Quick Insight Ollama browser client path, the `ollama` dependency, and Vite/Netlify `/ollama` proxy/redirect configuration so cost and ops stay on the Cloudflare chat path only. See PRD module **Ollama teardown**.

## Acceptance criteria

- [x] No Ollama client usage remains in the app
- [x] `ollama` dependency removed from package manifests when unused
- [x] Vite and Netlify `/ollama` proxy/redirect configuration removed
- [x] Quick Insight one-shot generate flow is fully gone (including any leftover on `/projects`)

## Blocked by

- Blocked by `issues/001-streaming-ask-lucia.md`

## User stories addressed

- User story 25
- User story 26

## Completion notes

- Quick Insight / Ollama client path was already gone from `src/` after issue 001; this slice removed the leftover dep + proxies.
- Regression checks in `worker/src/ollama-teardown.test.ts` assert package + Vite + Netlify stay free of `/ollama`.
- Cleared local gitignored `.env` Ollama API keys (not committed).
