# Guide for AI agents

Personal portfolio site: React 19 + TypeScript + Vite + SCSS, deployed on Netlify.
`README.md` is the public CV/profile, not developer docs. Use this file for project guidance.

## Layout

- `src/main.tsx`, `src/App.tsx`: entry point and routes (react-router).
- `src/sections/`: home page sections. `src/pages/`: other routes.
- `src/data/projects.ts`: project content. `src/assets/`: CV markdown and PDF.
- `src/styles/_theme.scss`: design tokens.
- `public/`: static files served as is (`llms.txt`, images).
- `dist/`: build output, committed. Do not edit by hand.
- `docs/`: long-form notes and `docs/issues/` for PRDs and issues. Create it when needed.

## Commands

Package manager is **npm** (`package-lock.json`). `package.json` scripts are the source of truth.

- `npm run dev`: dev server on port 3000.
- `npm run build`: typecheck (`tsc -b`) and production build.
- `npm run lint`: Biome lint.
- `npm run format`: Biome format with write.

Before committing, run `npm run lint` and `npm run build`. There is no test suite yet.
`lefthook.yml` defines the same checks as a pre-commit hook, but lefthook is not installed, so run them yourself.

## Recipes

- Add a project: add an entry to `src/data/projects.ts`, and add `<name>.webp`, `<name>-400w.webp` and `<name>-800w.webp` to `public/images/`. `ProjectsPage.tsx` renders the list. Update `public/llms.txt` and `public/llms-full.txt` if they describe projects.

## Rules

Follow every file in `.agents/rules/`:

- `comments.md`: no inline comments except tagged TODO/FIXME/HACK.
- `developer-preferences.md`: start simple, scale with evidence. Claude Code auto-loads it only for `.ts/.tsx/.js/.jsx` files; read it before planning any code change.

## Skills

Skills live in `.agents/skills/<name>/SKILL.md`. Read a skill's `SKILL.md` before doing that kind of work:

- `grill-me`: stress-test a plan by interviewing the user.
- `write-a-prd`: turn a brief into a PRD in `docs/issues/`.
- `prd-to-issues`: split a PRD into issue files in `docs/issues/`.
- `implement`: implement a spec or issue end to end. User-invoked only (`/implement`).
- `troubleshooting`: diagnose bugs and regressions.

Claude Code also loads plugins from `.claude/settings.json`:

- `ui-craft`: UI design and implementation, with `/ui-craft:*` commands (start with `/ui-craft:start`).
- `pstack`: engineering workflow skills and principles.

## Agent config layout

`.agents/` is the single source of truth. `.claude/skills` and `.claude/rules` are symlinks to it, so edit files under `.agents/` only.
`.claude/settings.json` holds shared Claude Code settings. `.claude/settings.local.json` is personal and gitignored.
