const Experience = () => (
	<section className="experience" id="experience">
		<article className="project-card" id="consulting">
			<h3 className="project-card__title">Senior Software Engineer</h3>
			<p className="project-card__meta">
				<span className="project-card__role">Self-employed</span>
				<span className="project-card__project">Present</span>
			</p>
			<p>
				Selected consulting work for small businesses. Some client projects are
				showcased in the{" "}
				<a className="project-card__name-link" href="/projects">
					Projects section.
					<svg
						className="project-entry__arrow"
						width="14"
						height="14"
						viewBox="0 0 14 14"
						fill="none"
						aria-hidden="true"
					>
						<path
							d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</a>
			</p>
			<ul>
				<li>
					Consulted on frontend architecture, performance, and full-stack
					delivery. Close partnership with clients to best fit the solution to
					their needs.
				</li>
				<li>
					Built and shipped production web applications with Next.js,
					TypeScript, and full ownership of infrastructure and CI/CD pipelines.
				</li>
				<li>
					Delivered end-to-end features integrating third-party APIs, CMS
					platforms, and automated notification systems.
				</li>
			</ul>
			<p className="project-card__stack">
				<b>Stack:</b> React, TypeScript, Cloudflare, GitHub Actions, Claude
				code, AI LLM providers, Postgres, Next.js.
			</p>
		</article>

		<article className="project-card" id="gartner-2">
			<h3 className="project-card__title">Senior Software Engineer</h3>
			<p className="project-card__meta">
				<span className="project-card__role">Gartner</span>
				<span className="project-card__project">
					{" "}
					Contact Management System{" "}
				</span>
			</p>
			<p>
				Platform to unify users across four Gartner Digital Markets properties
				(Capterra, SoftwareAdvice, GetApp, and UpCity), enabling marketing to
				run targeted campaigns from a single centralized contact list.
			</p>
			<ul>
				<li>
					Consumed sign-up and sign-in events via Kafka streams, curated emails,
					merged duplicate contacts, and re-exposed the processed data to
					downstream Kafka topics.
				</li>
				<li>
					Ran performance and metric validations to ensure the pipeline
					processed contacts without bottlenecks across all four properties,
					monitoring in Datadog.
				</li>
				<li>
					Built a Next.js dashboard for marketing to easily consult and manage
					the unified contact database.
				</li>
				<li>
					Expanded my full-stack capabilities — gained hands-on experience with
					Event-driven architecture, Microservices, and backend patterns.
				</li>
			</ul>
			<p className="project-card__stack">
				<b>Stack:</b> Kafka, TypeScript, AWS, SQS, S3, Docker, GitHub Actions,
				Jest, Postgres, Next.js.
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
				I focused on the Next.js website, working closely with product, design,
				and marketing, to improve the organic metrics and paid campaigns. Every
				feature release was carefully measured through A/B testing.
			</p>

			<p>
				My responsibilities included: Contributed to the migration from Material
				UI to custom Sass modules in close alignment with Figma's custom library
				created for our project.
			</p>
			<ul>
				<li>
					Cross-domain brainstorming sessions across Gartner Digital Markets,
					leading to the implementation of AI-generated summaries from user
					reviews to boost organic traffic.
				</li>
				<li>
					Drove WCAG 2.1 compliance efforts. Set up weekly browserstack
					accessibility reports on high-traffic pages, identified gaps, and
					partnered with design and SEO to fix shared components
				</li>
				<li>
					Contributed to the incremental migration from Material UI to custom
					Sass modules in close alignment with Figma's custom library created
					for our project.
				</li>
			</ul>
			<p className="project-card__stack">
				<b>Stack:</b> Next.js,React, TypeScript, SASS modules, GTM, GA,
				LaunchDarkly, Redis, Cloudflare, DebugBear, Percy, GraphQL, AWS S3.
			</p>
		</article>

		<article className="project-card" id="nimble-2">
			<h3 className="project-card__title">Software Engineer</h3>
			<p className="project-card__meta">
				<span className="project-card__role">Nimble.LA</span>
				<span className="project-card__project">Update AI</span>
			</p>
			<p>
				UpdateAI is an AI-powered platform designed to enhance customer success
				teams' productivity by automating meeting notes, insights, and
				follow-ups, enabling better decision-making. We were among the first
				teams to integrate with Zoom&apos;s beta extension APIs, collaborating
				directly with their team on the integration.
			</p>
			<p>
				The electron plugin captured real-time meeting audio via WebSockets,
				streamed it to our backend for AI analysis, and delivered meeting
				summaries, talking points, insights, and action items.
			</p>
			<p>
				Supported the Data team by building a feedback dashboard to review
				text-digested audio chunks and help train the AI model in its early
				stages.
			</p>
			<p className="project-card__stack">
				<b>Stack:</b> Electron, React, Socket.io, TypeScript, Docker, GitHub
				Actions, Jest, Postgres.
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
					Collaborated in cost-efficient MVPs to validate startup ideas in early
					stages, leveraging newest technologies and practices.
				</li>
				<li>
					Delivered multiple products across different domains in a fast-paced
					environment, iterating quickly as part of agile teams.
				</li>
				<li>
					Gained experience with multiple client solutions: mobile hybrid apps,
					desktop applications, web applications
				</li>
			</ul>
			<p className="project-card__stack">
				<b>Stack:</b> React.JS, Node.JS, Styled-Components, Formik, Typescript,
				Redux, Graphql React-Native
			</p>
		</article>
	</section>
);

export default Experience;
