const Experience = () => (
  <section className="experience" id="experience">
    <section className="experience__section">
      <h2 className="section__title">Brief Work Journey</h2>
      <p className="section__lead">
        I hold a Software Engineering degree from the National Technological University (UTN) in Rosario, Argentina.
      </p>
      <p>
        My career started as a <strong>Front End Developer</strong> at{' '}
        <a href="http://nimble.la" target="_blank" rel="noreferrer">
          Nimble.la
        </a>
        , a software factory focused on helping startups validate and scale their products. Working in that environment taught me that momentum matters as much as code quality when you are validating MVPs.
      </p>
      <ul className="story-list">
        <li>Be pragmatic with solutions so we can validate early and avoid reinventing the wheel.</li>
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
            I evolved from reporting directly to a tech lead into an independent engineer trusted by our CTO to lead projects end to end.
          </p>
        </li>
        <li className="milestone">
          <h3 className="milestone__title">Barcelona Move — Gartner Digital Markets</h3>
          <p className="milestone__details">
            Joining Gartner&apos;s GetApp team exposed me to large-scale products, mature processes, and the discipline required to maintain and extend consolidated platforms.
          </p>
        </li>
        <li className="milestone">
          <h3 className="milestone__title">Senior Engineer &amp; Product Partner</h3>
          <p className="milestone__details">
            I leaned into advanced product skills: event-based tracking, SEM/PPC, SEO, structured data, and Core Web Vitals. Next.js became a key ally for performance-led delivery.
          </p>
        </li>
      </ul>
    </section>

    <section className="experience__section">
      <h2 className="section__title">Development of Skills &amp; Expertise</h2>
      <p>
        Front-end craftsmanship remains my leverage point to help product teams validate ideas, iterate quickly, and keep solutions measurable and maintainable.
      </p>
      <ul className="expertise-list">
        <li>
          Recognised for partnering closely with product to identify the smallest efforts that unlock the biggest impact.
        </li>
        <li>
          Proactively propose technical initiatives—caching heavy blog posts, refactoring nested links penalised by search crawlers—to keep the roadmap aligned with current goals.
        </li>
      </ul>
    </section>

    <section className="experience__section">
      <h2 className="section__title">Recent Experience — Selected Projects</h2>
      <div className="projects">
        <article className="project-card">
          <h3 className="project-card__title">GetApp Growth Platform</h3>
          <p>
            Co-led acquisition and engagement initiatives across the marketplace, aligning marketing, SEO, and product experiments around measurable growth targets.
          </p>
          <p className="project-card__stack">
            Stack: Next.js, TypeScript, SASS, GTM, GA, LaunchDarkly, Redis, Cloudflare, DebugBear, Percy, GraphQL.
          </p>
        </article>
        <article className="project-card">
          <h3 className="project-card__title">AI Chatbot Pilot</h3>
          <p>
            Delivered an internal proof-of-concept that explored how AI could enhance the product experience and support our research workflows.
          </p>
          <p className="project-card__stack">
            Stack: OpenAI API, Pinecone, Python, LangChain, Vite, custom analytics dashboards.
          </p>
        </article>
        <article className="project-card">
          <h3 className="project-card__title">Contact Management System</h3>
          <p>
            Partnered with marketing to consolidate customer profiles from Capterra, SoftwareAdvice, and GetApp, enabling targeted campaigns for high-value users.
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
