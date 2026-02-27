// src/App.tsx

import './App.scss';
import Experience from './sections/Experience';

const cvMarkdown = new URL('./assets/lucia-puccini-cv.md', import.meta.url).href;
const cvPdf = new URL('./assets/lucia-puccini-cv.pdf', import.meta.url).href;

const skills = [
  "Front-End Expertice",
  "Web Performance Optimization",
  'Rapid Experimentation Delivery',
  "Full-Stack Exposure",
  'Cross-Functional Collaboration',
  "Proactive Problem Solving",
  "Staying Current with Emerging Tech",
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
          <h1 className="hero__title">Senior Software Engineer</h1>
          <p className="hero__lead">
             Eight years of building and scaling web products, from lean MVPs to high-impact initiatives.
  
          </p>
          <p className="hero__sub">
  I help teams move fast by focusing on solutions that are simple, measurable, and aligned with business goals.
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
What I'm good at and what I enjoy working on — from building fast, scalable frontends to experimenting with new tech and collaborating across teams to have real impact.
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
          <span>&copy; {new Date().getFullYear()} Lucia Puccini.</span>
          
        </div>
      </footer>
    </div>
  );
}

export default App;
