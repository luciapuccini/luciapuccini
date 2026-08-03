## Parent PRD

`issues/prd.md`

## What to build

Security-first **site-only access** for the public chat API: prevent CSRF-style cross-site use and XSS on the chat surface. Origin allowlist + strict CORS are controls (production site + localhost in dev), not the goal itself. Render user and assistant content as safe text (no HTML injection from model output). Show a clear modal error when the Worker rejects a request for security reasons. Must-have tests per PRD **Testing Decisions**. See PRD module **Site-only access (security-first)**.

## Acceptance criteria

- [ ] Worker rejects chat requests from disallowed origins (cross-site / CSRF-style browser abuse blocked)
- [ ] Worker accepts allowed origins (production site + localhost in development) at the security gate
- [ ] CORS/response headers match the allowlist policy
- [ ] Chat UI renders messages as text (not raw HTML), mitigating XSS via model or user content
- [ ] Modal shows a clear error when the API rejects a request for security reasons
- [ ] Automated tests cover: disallowed origin rejected; allowed origin accepted at the security gate (LLM may be mocked)

## Blocked by

- Blocked by `issues/001-streaming-ask-lucia.md`

## User stories addressed

- User story 33
- User story 34
- User story 35
- User story 36
- User story 37 (security rejection path)
