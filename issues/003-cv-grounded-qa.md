## Parent PRD

`issues/prd.md`

## What to build

**CV-grounded Q&A** on top of the streaming chat path: modal empty state with short welcome + suggestion chips; Worker answers only from a hand-authored static context pack (CV + projects + public contact, no phone), with match-user-language, brief replies, and ~512 max output tokens. Do not use stale `llms-*` / `cv-homepage.md` as the source of truth. Chip copy may be chosen in this issue. See PRD module **CV-grounded Q&A**.

## Acceptance criteria

- [ ] Modal opens with a short welcome and tappable suggestion chips; a chip send behaves like a normal user message
- [ ] New curated context pack ships with the Worker (CV, project blurbs, public LinkedIn/GitHub/email; no phone)
- [ ] Assistant is instructed to answer only from the pack, refuse off-pack invention, match user language, and keep answers brief
- [ ] Worker enforces ~512 max generation tokens
- [ ] Asking about roles, skills, projects, or public contact yields pack-grounded answers; unknown topics get an honest don’t-know / handoff style reply rather than hallucination

## Blocked by

- Blocked by `issues/001-streaming-ask-lucia.md`

## User stories addressed

- User story 5
- User story 6
- User story 7
- User story 9
- User story 10
- User story 11
- User story 12
- User story 13
- User story 14
- User story 15
- User story 16
- User story 24
- User story 28
- User story 29
- User story 32
- User story 40
- User story 41
- User story 42
