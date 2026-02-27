const Experience = () => (
  <section className="experience" id="experience">
    <section className="experience__section">
      <h2 className="section__title">Brief Work Journey</h2>
      {/* <p className="section__lead">
        Software Engineering degree from the National Technological University (UTN) in Rosario, Argentina.
      </p> */}
      <p>
        My career started as a <strong>Front End Developer</strong> at{' '}
        <a href="http://nimble.la" target="_blank" rel="noreferrer">
          Nimble.la
        </a>
        , a software factory focused on helping startups validate and scale their products. Working in that environment taught me the importance of building and shiping fast to validate ideas.
      </p>
      <ul className="story-list">
        <li>Be pragmatic with solutions so we can validate early and focus on what's already proven.</li>
        <li>Invest in cost-efficient approaches and help founders distinguish what users need from what they want.</li>
        <li>Measure everything and take data-informed decisions, while still testing bold ideas that deliver quick wins.</li>
      </ul>


    </section>

    <section className="experience__section">
      <h2 className="section__title">Key Milestones &amp; Roles</h2>
      <ul className="milestones">
        <li className="milestone">
          <h3 className="milestone__title">From Junior to Independent Engineer</h3>
          <p className="milestone__details">
            I evolved from reporting directly to a tech lead into an independent engineer, working closely to our CTO and trusted to handle some projects on my own.
          </p>
        </li>
        <li className="milestone">
          <h3 className="milestone__title">Software engineer</h3>
          <p className="milestone__details">
            Joining Gartner&apos;s GetApp team exposed me to large-scale products, mature processes, and the discipline required to maintain and extend consolidated platforms.
          </p>
        </li>
        <li className="milestone">
          <h3 className="milestone__title">Senior Software Engineer </h3>
          <p className="milestone__details">
            Stepped into a Senior Software Engineer role by diving deep into product-focused engineering. Focused on how optimizing organic traffic and web performance metrics can impact business outcomes.
          </p>
          <p className="milestone__details">
            Beyond my core role, I took the lead on internal projects and embraced opportunities to grow, stepping outside my comfort zone to explore AI-driven solutions and full-stack challenges.
          </p>
        </li>
      </ul>
    </section>

    <section className="experience__section">
      <h2 className="section__title">Expertise &amp; Strengths</h2>
      <p>
        My Front end expertice has proven a crucial skill to help the product teams to validate ideas quickly, iterate solutions in easily measurable & maintainable ways.
      </p>

      <p className="milestone__details">
        Something I get praiced for is participating close with product to help understand what are the smaller efforts that we can do to have the biggest impact & act proactively in this direction. Coming up to them with small technical projects usually is valuable and very actionable as long as it aligns with the current goals. ex. proposing to cache blog posts or asking for some time to refactor components that had nested links that could be causing google to penalize our site.
      </p>

    </section>

    <section className="experience__section">
      <h2 className="section__title">Recent Experience</h2>
      <div className="projects">
        <article className="project-card">
          <h3 className="project-card__title">GetApp</h3>
          <p>
            Software discovery platform that helps businesses find, compare, and read user reviews about B2B software solutions. Some of my latest contributions:
            <ul>

              <li>
                Experimented with AI summaries and insights from user reviews to increase organic traffic
              </li>
              <li>
                Efforts in reducing duplicated content and extend product pages to provide better user experience.
              </li>
              <li>
                Pair with design and product to give the blog a fresh look & modernize our design system, including a migration from Material UI to custom components.
              </li>
              <li>
                Technical evaluation of migrating Next.js to App directory approach
              </li>
            </ul>
          </p>
          <p className="project-card__stack">
            Stack: Next.js, TypeScript, SASS modules, GTM, GA, LaunchDarkly, Redis, Cloudflare, DebugBear, Percy, GraphQL.
          </p>
        </article>
        <article className="project-card">
          <h3 className="project-card__title">AI Chatbot MVP</h3>
          <p>
            Delivered an internal proof-of-concept that explored how AI could enhance the product experience. From product ideation sessions to full demo rollout.
          </p>
          <p className="project-card__stack">
            Stack: OpenAI API, Pinecone, Python, LangChain, Vite.
          </p>
        </article>
        <article className="project-card">
          <h3 className="project-card__title">Contact Management System</h3>
          <p>
            Partnered with marketing to consolidate customer profiles from Capterra, SoftwareAdvice, and GetApp, enabling targeted campaigns for high-value users. Great opportunity to challenge and expand my full-stack capabilities
          </p>
          <p className="project-card__stack">
            Stack: Kafka, TypeScript, SQS, S3, Docker, GitHub Actions, Jest, Postgres, Next.js.
          </p>
        </article>
      </div>
    </section>

    <section className="experience__section philosophy">
      <h2 className="section__title">Career Philosophy</h2>
      <p>
        I look for the smallest shippable slice that proves an idea, and I partner proactively with product, SEO, and marketing teams to keep outcomes aligned with business goals. I am seeking a senior role where I can continue championing that "small effort, big impact" mindset while learning new practices that help us build remarkable products.
      </p>
    </section>
  </section>
);

export default Experience;
