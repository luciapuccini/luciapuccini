---
name: verify
description: Run the portfolio under netlify dev and drive it in a headless browser to prove a change works, including the Quick insight edge function. Use when verifying a UI or edge-function change.
---

# Verify

## Launch

`npm run dev` runs `netlify dev` on port 3000 with Vite on 5173. If either port is taken, run an isolated copy instead:

```bash
npx netlify-cli@27.12.1 dev --offline --port 8888 --target-port 5199 --command "npx vite --port 5199 --strictPort" --no-open
```

Ready when the log prints `Local dev server ready` and `Loaded edge function insight`. `.env` must define `OLLAMA_API_KEY` (no `VITE_` prefix). Never print its value.

## Drive

Install Playwright in a scratch directory outside the repo (`npm i playwright` there, then `npx playwright install chromium-headless-shell`).

- Quick insight, desktop: click `.quick-insight--desktop .quick-insight__btn`, wait for `.quick-insight__text` or `.quick-insight__error`.
- Quick insight, mobile (390px wide): click `.quick-insight-nav-btn`, the result opens in a modal.
- Error path: intercept `**/api/insight` with `route.continue({ postData })` and send a `pageText` over 20,000 characters. Expect a 400 and the error text in the panel.
- SPA fallback: load `/projects` directly. Expect 200 and the Projects page.

Record every request and assert none carries an `Authorization` header or goes to `ollama.com`. The key must stay on the server.

## Probe the endpoint

`POST /api/insight` with `{"pageText": "..."}`. GET returns 405. Malformed JSON, a missing or non-string `pageText`, whitespace only, or over 20,000 characters return 400.

## Gotchas

- Ollama Cloud rejects more than 4 stop sequences with HTTP 400.
- A plain `npx vite` server has no edge functions, so `/api/insight` falls through to the SPA.
- Built bundle check: `grep -c Bearer dist/assets/*.js` must be 0.
