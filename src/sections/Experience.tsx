const Experience = () => (
	<section className="experience" id="experience">
		<article className="project-card" id="gartner-2">
			<h3 className="project-card__title">Senior Software Engineer</h3>
			<p className="project-card__meta">
				<span className="project-card__role">Gartner</span>
				<span className="project-card__project">CMS</span>
			</p>
			<p>
				Contact Management System — a platform to unify users across four
				Gartner Digital Markets properties (Capterra, SoftwareAdvice, GetApp,
				and UpCity), enabling marketing to run targeted campaigns from a single
				centralized contact list.
			</p>
			<ul>
				<li>
					Consumed sign-up and sign-in events via Kafka streams, curated emails,
					merged duplicate contacts, and re-exposed the processed data to
					downstream Kafka topics.
				</li>
				<li>
					Ran performance and metric validations to ensure the pipeline
					processed contacts without bottlenecks across all four properties.
				</li>
				<li>
					Built a dashboard for marketing to easily consult and manage the
					unified contact database.
				</li>
				<li>
					Expanded my full-stack capabilities — gained hands-on experience with
					Event-driven architecture, Microservices, and backend patterns.
				</li>
			</ul>
			<p className="project-card__stack">
				Stack: Kafka, TypeScript, AWS, SQS, S3, Docker, GitHub Actions, Jest,
				Postgres, Next.js.
			</p>
		</article>

		<article className="project-card" id="gartner-1">
			<h3 className="project-card__title">Software Engineer</h3>
			<p className="project-card__meta">
				<span className="project-card__role">Gartner</span>
				<span className="project-card__project">GetApp</span>
			</p>
			<p>
				GetApp is a software discovery platform serving millions of users,
				helping businesses find, compare, and read user reviews about B2B
				software solutions.
			</p>
			<p>
				Working closely with product, design, and marketing, I focused on
				identifying the smallest efforts with the biggest impact — from caching
				blog posts to refactoring components with nested links that could cause
				Google to penalize our site. Every feature release was carefully
				measured through A/B testing and feature flags to avoid impacting
				production.
			</p>
			<ul>
				<li>
					Volunteered for cross-domain brainstorming sessions across Gartner
					Digital Markets, leading to the implementation of AI-generated
					summaries from user reviews to boost organic traffic
				</li>
				<li>
					Drove WCAG 2.1 compliance efforts. Set up weekly accessibility reports
					on high-traffic pages, identified gaps, and partnered with design and
					SEO to fix contrast ratios, alt text, fonts, and semantic HTML across
					shared components
				</li>
				<li>
					Contributed to the migration from Material UI to custom Sass modules,
					advocating for clean server-rendered HTML and strict design token
					compliance over utility-class alternatives
				</li>
				<li>
					Reduced duplicated content and extended product pages to improve SEO
					positioning and user experience
				</li>
				<li>
					Technical evaluation of migrating Next.js to App directory approach
				</li>
			</ul>
			<p className="project-card__stack">
				Stack: Next.js, TypeScript, SASS modules, GTM, GA, LaunchDarkly, Redis,
				Cloudflare, DebugBear, Percy, GraphQL.
			</p>
		</article>

		<article className="project-card" id="nimble-2">
			<h3 className="project-card__title">Software Engineer</h3>
			<p className="project-card__meta">
				<span className="project-card__role">Nimble.LA</span>
				<span className="project-card__project">Update AI</span>
			</p>
			<p>
				Trusted as an independent contributor working directly with the client,
				I led the front-end for a Zoom Marketplace plugin built during COVID. We
				were among the first teams to integrate with Zoom&apos;s beta extension
				APIs, collaborating directly with their team on the integration.
			</p>
			<p>
				The plugin captured real-time meeting audio via WebSockets, streamed it
				to our backend for AI analysis, and delivered meeting summaries, talking
				points, insights, and action items — all tied to the original agenda.
				Desktop app embedded with Electron.
			</p>
			<p>
				Supported the Data team by building a feedback dashboard to review
				text-digested audio chunks and help train the AI model in its early
				stages.
			</p>
			<p className="project-card__stack">
				Stack: Kafka, TypeScript, SQS, S3, Docker, GitHub Actions, Jest,
				Postgres, Next.js, Electron, React, Socket.io.
			</p>
		</article>

		<article className="project-card" id="nimble-1">
			<h3 className="project-card__title">Frontend Developer</h3>
			<p className="project-card__meta">
				<span className="project-card__role">Nimble.LA</span>
				<span className="project-card__project">Startups</span>
			</p>
			<p>
				A software factory in Los Angeles focused on helping startups validate
				and scale their products. Part of a distributed team across Argentina
				and LA, building for clients who needed to move fast on tight budgets.
			</p>
			<ul className="story-list">
				<li>
					Built cost-efficient MVPs to validate startup ideas in early stages,
					focusing on what users actually needed over what founders assumed.
				</li>
				<li>
					Delivered multiple products across different domains in a fast-paced
					environment, iterating quickly based on data-informed decisions.
				</li>
				<li>
					Learned how to find pragmatic solutions with limited resources —
					skills that carried through the rest of my career.
				</li>
			</ul>
			<p className="project-card__stack">
				Stack: React.JS, Node.JS, Styled-Components, Formik, Typescript, Redux,
				React-Native
			</p>
		</article>
	</section>
);

export default Experience;
