## Parent PRD

`issues/prd.md`

## What to build

**Eight-question session** budget end-to-end: tab-scoped `sessionId`, UI `n/8` for user messages only, Worker in-memory enforcement, hard-stop with LinkedIn / email / CV links when capped. Static welcome does not consume budget; chip sends do. No Durable Objects; refresh/new tab starts a new budget. Must-have tests per PRD **Testing Decisions**. See PRD module **Eight-question session**.

## Acceptance criteria

- [ ] Client sends a tab-scoped `sessionId` with chat requests
- [ ] UI shows remaining/used count out of 8 for user messages only (welcome text free; model replies free)
- [ ] Worker allows the 8th user message and rejects the 9th without calling the model
- [ ] At cap, input is disabled with a clear message and links to LinkedIn, email, and CV
- [ ] New `sessionId` (new tab / refresh) gets a fresh budget
- [ ] Modal shows a clear error when the API rejects for budget reasons
- [ ] Automated tests cover: 8th allowed, 9th capped without model call, fresh `sessionId` resets budget (LLM may be mocked)

## Blocked by

- Blocked by `issues/001-streaming-ask-lucia.md`

## User stories addressed

- User story 17
- User story 18
- User story 19
- User story 20
- User story 21
- User story 22
- User story 30
- User story 37 (budget rejection path)
