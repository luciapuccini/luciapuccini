const Experience = () => (
	<section className="experience" id="experience">
		<article className="project-card" id="gartner">
			<h3 className="project-card__title">Gartner / GetApp</h3>
			<p className="project-card__meta">
				<span className="project-card__role">
					Software Engineer → Senior Software Engineer
				</span>
				<span className="project-card__period">2021 – Present</span>
			</p>
			<p>
				GetApp is a software discovery platform that helps businesses find,
				compare, and read user reviews about B2B software solutions.
			</p>
			<p>
				My front-end expertise has proven crucial in helping product teams
				validate ideas quickly and iterate solutions in easily measurable &amp;
				maintainable ways. I work closely with product to identify the smallest
				efforts that can have the biggest impact — proposing technical projects
				like caching blog posts or refactoring components with nested links that
				could cause Google to penalize our site.
			</p>
			<ul>
				<li>
					Experimented with AI summaries and insights from user reviews to
					increase organic traffic
				</li>
				<li>
					Efforts in reducing duplicated content and extend product pages to
					provide better user experience
				</li>
				<li>
					Pair with design and product to give the blog a fresh look &amp;
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

		<article className="project-card" id="ai-chatbot">
			<h3 className="project-card__title">AI Chatbot MVP</h3>
			<p className="project-card__meta">
				<span className="project-card__role">Lead Engineer</span>
				<span className="project-card__period">Gartner · Internal project</span>
			</p>
			<p>
				Delivered an internal proof-of-concept that explored how AI could
				enhance the product experience. From product ideation sessions to full
				demo rollout.
			</p>
			<p className="project-card__stack">
				Stack: OpenAI API, Pinecone, Python, LangChain, Vite.
			</p>
		</article>

		<article className="project-card" id="contact-mgmt">
			<h3 className="project-card__title">Contact Management System</h3>
			<p className="project-card__meta">
				<span className="project-card__role">Full-Stack Engineer</span>
				<span className="project-card__period">Gartner · Internal project</span>
			</p>
			<p>
				Partnered with marketing to consolidate customer profiles from Capterra,
				SoftwareAdvice, and GetApp, enabling targeted campaigns for high-value
				users. Great opportunity to challenge and expand my full-stack
				capabilities.
			</p>
			<p className="project-card__stack">
				Stack: Kafka, TypeScript, SQS, S3, Docker, GitHub Actions, Jest,
				Postgres, Next.js.
			</p>
		</article>

		<article className="project-card" id="nimble">
			<h3 className="project-card__title">Nimble.la</h3>
			<p className="project-card__meta">
				<span className="project-card__role">
					Frontend Developer → Independent Contributor
				</span>
				<span className="project-card__period">2018 – 2021</span>
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
		</article>
	</section>
);

export default Experience;
