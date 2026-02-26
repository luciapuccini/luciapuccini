// src/App.tsx

import './App.scss';
import Experience from './sections/Experience';

const cvMarkdown = new URL('./assets/lucia-puccini-cv.md', import.meta.url).href;
const cvPdf = new URL('./assets/lucia-puccini-cv.pdf', import.meta.url).href;

const skills = [
  'Next.js',
  'TypeScript',
  'React',
  'SASS',
  'LaunchDarkly',
  'Core Web Vitals',
  'SEO & Structured Data',
  'A/B Experimentation',
  'GTM / GA',
  'Redis',
  'Cloudflare',
  'GraphQL',
  'Python',
  'LangChain',
  'Kafka',
  'Postgres'
];

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <div className="header__inner">
          <div className="brand">
            <span className="brand__symbol">//</span>
            <span>LP</span>
          </div>
          <nav className="nav">
            <a className="nav__link" href="#experience">Experience</a>
            <a className="nav__link" href="#skills">Skills</a>
            <a
              className="nav__link"
              href="https://www.linkedin.com/in/luciapuccini/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a className="nav__link" href="mailto:luciapuccini@gmail.com">Contact</a>
          </nav>
        </div>
      </header>

      <main className="main">
        <section className="hero" id="top">
          <span className="hero__eyebrow">Lucia Puccini</span>
          <h1 className="hero__title">Senior Front-end &amp; Product Engineer</h1>
          <p className="hero__lead">
            Eight years of shipping growth-focused web products—from MVP validation sprints with founders to performance-driven initiatives across Gartner&apos;s marketplaces.
          </p>
          <p className="hero__sub">
            I bridge product, SEO, and marketing teams to design small, measurable releases that prove value fast.
          </p>
          <div className="hero__actions">
            <a
              className="button"
              href={cvMarkdown}
              download
            >
              Download CV (.md)
            </a>
            <a
              className="button button--ghost"
              href={cvPdf}
              target="_blank"
              rel="noreferrer"
            >
              View CV (PDF)
            </a>
            <a
              className="button button--link"
              href="https://www.linkedin.com/in/luciapuccini/"
              target="_blank"
              rel="noreferrer"
            >
              Connect on LinkedIn
            </a>
          </div>
        </section>

        <section className="skills" id="skills">
          <h2 className="skills__title">Focus Areas</h2>
          <p className="skills__description">
            Tooling and practices I reach for when accelerating discovery, shipping experiments, and scaling validated ideas.
          </p>
          <div className="skills__grid">
            {skills.map((skill) => (
              <span className="skill-pill" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        <Experience />
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <span>&copy; {new Date().getFullYear()} Lucia Puccini. Crafted with curiosity.</span>
          <span>Based in Barcelona, collaborating globally.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
