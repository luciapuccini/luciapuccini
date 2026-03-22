const Experience = () => (
	<section className="experience" id="experience">
		<article className="project-card" id="gartner-2">
			<h3 className="project-card__title">Senior Software Engineer</h3>
			<p className="project-card__meta">
				<span className="project-card__role">Gartner</span>
				<span className="project-card__project">CMS</span>
			</p>
			<p>Contact Management System</p>

			<ul>
				<li>
					Centralized repository of users, consuming sign-ups from different
					properties and merging contacts together.
				</li>
				<li>
					Learned about hexagonal architecture, databases, event-based
					technologies, and other backend patterns.
				</li>
				<li>
					Partnered with marketing to consolidate customer profiles from
					Capterra, SoftwareAdvice, and GetApp, enabling targeted campaigns for
					high-value users. Great opportunity to challenge and expand my
					full-stack capabilities.
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
				GetApp is a software discovery platform that helps businesses find,
				compare, and read user reviews about B2B software solutions.
			</p>
			<p>
				My front-end expertise has proven valuable in helping product teams
				validate ideas quickly and iterate solutions in easily measurable &amp;
				maintainable ways. I work closely with product to identify the smallest
				efforts that can have the biggest impact, proposing quick wins like
				caching blog posts or refactoring components with nested links that
				could cause Google to penalize our site.
			</p>
			<ul>
				<li>
					Experimented with AI summaries and insights from user reviews to
					increase organic traffic
				</li>
				<li>
					Efforts in reducing duplicated content and extending product pages to
					provide a better user experience
				</li>
				<li>
					Paired with design and product to give the blog a fresh look &amp;
					modernize our design system, including a migration from Material UI to
					custom components
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
				Led the front-end efforts to integrate our product into a
				videoconference provider. Desktop app embedded with Electron.
			</p>
			<p>
				Learned about sockets and events, how AI could enhance products by
				digesting audio and making agendas for follow-up meetings with insights
				and actionable items.
			</p>
			<p>
				Gave the Data team support to train the AI with a feedback dashboard
				showing our database text-digested chunks.
			</p>

			<p className="project-card__stack">
				Stack: Kafka, TypeScript, SQS, S3, Docker, GitHub Actions, Jest,
				Postgres, Next.js.
			</p>
		</article>

		<article className="project-card" id="nimble-1">
			<h3 className="project-card__title">Frontend Developer</h3>
			<p className="project-card__meta">
				<span className="project-card__role">Nimble.la</span>
				<span className="project-card__project">Startups</span>
			</p>
			<p>
				A software factory focused on helping startups validate and scale their
				products. I evolved from reporting directly to a tech lead into an
				independent engineer, working closely with the CTO and trusted to handle
				projects on my own.
			</p>
			<ul className="story-list">
				<li>
					Be pragmatic with solutions so we can validate early and focus on
					what's already proven.
				</li>
				<li>
					Invest in cost-efficient approaches and help founders distinguish what
					users need from what they want.
				</li>
				<li>
					Measure everything and take data-informed decisions, while still
					testing bold ideas that deliver quick wins.
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
