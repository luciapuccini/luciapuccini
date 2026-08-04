/** Hand-maintained Ask Lucia context. Do not treat llms-* or cv-homepage.md as source of truth. */
export const CHAT_CONTEXT = `
# Lucia Puccini — portfolio context

## Profile
- Name: Lucia Puccini
- Role: Frontend Software Engineer
- Experience: 7+ years building web applications with modern frontend tools
- Works in product-facing and enterprise environments with product, design, QA, and backend teams
- Education: Degree in Engineering Information Systems, National Technological University (UTN), Rosario, Argentina
- Languages: Spanish, English
- Work authorization: EU Citizenship (Italian)

## Timeline
- Frontend Engineer, Nimble.LA — 2018–2021
- Software Engineer II, Gartner — 2021–2025
- Software Engineer, Consulting (self-employed) — Present

## Roles and experience

### Software Engineer — Self-employed / Consulting (Present)
Selected consulting for small businesses. Client projects also appear under Projects.
- Consulted on frontend architecture, performance, and full-stack delivery; partnered with clients to fit solutions to their needs
- Built and shipped production apps with Next.js, TypeScript, and ownership of infrastructure and CI/CD
- Delivered end-to-end features integrating third-party APIs, CMS platforms, and automated notifications
- Stack: React, TypeScript, Cloudflare, GitHub Actions, Claude code, AI LLM providers, Postgres, Next.js

### Software Engineer II — Gartner — Contact Management System
Platform to unify users across four Gartner Digital Markets properties (Capterra, SoftwareAdvice, GetApp, UpCity) so marketing can run campaigns from one contact list.
- Consumed sign-up/sign-in events via Kafka, curated emails, merged duplicates, re-exposed data to Kafka
- Performance and metric validation across properties; monitored in Datadog
- Built a Next.js dashboard for marketing to manage the unified contact database
- Grew full-stack skills: event-driven architecture, microservices, backend patterns
- Stack: Kafka, TypeScript, AWS, SQS, S3, Docker, GitHub Actions, Jest, Postgres, Next.js

### Software Engineer — Gartner — GetApp
GetApp is a software discovery platform helping businesses find, compare, and review B2B software.
- Focused on the Next.js site with product, design, and marketing; improved organic and paid metrics; A/B tested releases
- Cross-domain work on AI-generated summaries from user reviews to boost organic traffic
- Drove WCAG 2.1 compliance; BrowserStack accessibility reports; fixed shared components with design and SEO
- Migrated from Material UI toward custom Sass modules aligned with Figma
- Stack: Next.js, React, TypeScript, SASS modules, GTM, GA, LaunchDarkly, Redis, Cloudflare, DebugBear, Percy, GraphQL, AWS S3

### Software Engineer — Nimble.LA — Update AI
AI platform for customer success: automates meeting notes, insights, and follow-ups. Early Zoom beta extension API integration.
- Electron plugin captured meeting audio via WebSockets, streamed for AI analysis, delivered summaries and action items
- Built a feedback dashboard to review text-digested audio chunks and help train the model
- Stack: Electron, React, Socket.io, TypeScript, Docker, GitHub Actions, Jest, Postgres

### Frontend Developer — Nimble.LA — Startups
Software factory in Los Angeles helping startups validate and scale; distributed team (Argentina / LA).
- Cost-efficient MVPs; multiple products across domains; mobile hybrid, desktop, and web apps
- Stack: React, Node.js, Styled-Components, Formik, TypeScript, Redux, GraphQL, React Native

## Technical skills
- Frontend: React, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Flexbox, Redux, Responsive Design, Tailwind CSS, SASS, SSR, SSG, Jest, Cypress, react-testing-library, Percy, useMemo, useCallback, React.memo, virtualisation, Vite
- AI & LLM: OpenAI API, LangChain, Pinecone, RAG, Prompt Engineering, Generative AI, AI Agents, AI-powered automation, LLM integration, Anthropic
- Backend & infrastructure: Node.js, Python, GraphQL, REST APIs, Kafka, SQS, Redis, PostgreSQL, S3, Docker, CI/CD (GitHub Actions), AWS, Vercel, Cloudflare, Git, Github, Monorepo npm workspaces, Microfrontends, tRPC
- Performance & quality: Core Web Vitals, Lighthouse, Code Splitting, Bundle Optimization, Web Performance Optimization, A/B Testing, Accessibility (WCAG), Technical SEO
- Tools: Agile, Jira, Datadog, Slack, Code Reviews, Technical Specifications, Cross-functional Collaboration

## Featured projects
### CYS Electronics
- URL: https://cyselectronics.netlify.app/
- Corporate marketing site for an electronics company; contact form with spam protection via Netlify Forms
- Stack: React, TypeScript, Vite, Styled-components, Netlify

### Farmacia Duret
- URL: https://farmaciaduret.online
- Pharmacy site (Villa Rosa, Buenos Aires): product catalog, online order form, Telegram notifications; runs server-side on Cloudflare's edge
- Stack: Next.js 16, TypeScript, SCSS Modules, Cloudflare Workers, WhatsApp Business API

### StrengthSync
- URL: https://strengthsync-chat.puccinilucia.workers.dev
- GitHub: https://github.com/luciapuccini/strengthsync-chat
- Pre-launch landing for an AI-powered strength training platform (under development)
- Stack: Cloudflare, Vercel AI SDK, TypeScript, Tailwind v4, shadcn/radix UI, Temporal, Vercel

## Public contact (no phone)
- LinkedIn: https://www.linkedin.com/in/luciapuccini/
- GitHub: https://github.com/luciapuccini
- Email: puccinilucia@gmail.com
- Portfolio: https://luciapuccini.com
`.trim();
