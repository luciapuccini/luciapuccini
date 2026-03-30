// src/App.tsx

import "./App.scss";
import Experience from "./sections/Experience";
import QuickInsight from "./sections/QuickInsight";
import Sidebar from "./sections/Sidebar";
import Timeline from "./sections/Timeline";

const cvPdfEN = new URL(
	"./assets/CV Lucia puccini Resume EN.pdf",
	import.meta.url,
).href;
const cvPdfES = new URL(
	"./assets/Lucia Puccini CV curriculum ES.pdf",
	import.meta.url,
).href;
const profilePic = import.meta.env.DEV
	? "/profile-pic.webp"
	: "/cdn-cgi/image/width=800,quality=80/profile-pic.webp";

const skills = [
	"Front-End Architecture",
	"SEO & Organic Growth",
	"Web Performance",
	"AI-Enhanced Products",
	"A/B Testing & Experimentation",
	"Cross-Functional Collaboration",
	"Event-Driven Systems",
];

const HERO_SKILL_COUNT = 4;

function App() {
	return (
		<div className="app">
			<header className="app__header">
				<div className="header__inner">
					<nav className="nav">
						<a className="nav__link" href="#experience">
							Experience
						</a>
						<a className="nav__link" href="#skills">
							Skills
						</a>
						<QuickInsight mode="mobile" />
					</nav>
				</div>
			</header>

			<div className="layout">
				<Sidebar profilePic={profilePic} cvPdfEN={cvPdfEN} cvPdfES={cvPdfES}>
					<QuickInsight mode="desktop" />
				</Sidebar>

				<main className="layout__content">
					<section className="hero" id="top">
						<img
							src={profilePic}
							alt="Lucia Puccini"
							className="hero__photo"
							width={260}
							height={320}
						/>
						<div className="hero__content">
							<h1 className="hero__title">Lucia Puccini</h1>
							<span className="hero__eyebrow">Senior Software Engineer</span>

							<p className="hero__sub">
								I help teams move fast by focusing on solutions that are simple,
								measurable, and aligned with business goals.
							</p>
							<div className="hero__skills">
								{skills.slice(0, HERO_SKILL_COUNT).map((skill) => (
									<a
										className="skill-pill skill-pill--sm"
										href="#skills"
										key={skill}
									>
										{skill}
									</a>
								))}
								<a
									className="skill-pill skill-pill--sm skill-pill--more"
									href="#skills"
								>
									+{skills.length - HERO_SKILL_COUNT}
								</a>
							</div>
						</div>
					</section>

					<Timeline />

					<Experience />

					<section className="skills" id="skills">
						<h2 className="skills__title">Focus Areas</h2>
						<p className="skills__description">
							What I'm good at and what I enjoy working on — from building fast,
							scalable frontends to experimenting with new tech and
							collaborating across teams to have real impact.
						</p>
						<div className="skills__grid">
							{skills.map((skill) => (
								<span className="skill-pill" key={skill}>
									{skill}
								</span>
							))}
						</div>
					</section>
				</main>
			</div>

			<footer className="footer">
				<div className="footer__inner">
					<span>&copy; {new Date().getFullYear()} Lucia Puccini.</span>
				</div>
			</footer>
		</div>
	);
}

export default App;
