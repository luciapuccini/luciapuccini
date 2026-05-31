import { Link, Route, Routes } from "react-router-dom";
import "./App.scss";
import ProjectsPage from "./pages/ProjectsPage";
import Experience from "./sections/Experience";
import QuickInsight from "./sections/QuickInsight";
import Sidebar from "./sections/Sidebar";
import Timeline from "./sections/Timeline";

const profilePic = import.meta.env.DEV
	? "images/profile-pic.webp"
	: "https://luciapuccini.com/.netlify/images?url=/images/profile-pic.webp&w=260&q=80";

const skillGroups = [
	{
		title: "Frontend",
		items: [
			"React",
			"Next.js",
			"TypeScript",
			"JavaScript (ES6+)",
			"HTML5",
			"CSS3",
			"Flexbox",
			"Redux",
			"Responsive Design",
			"Tailwind CSS",
			"SASS",
			"Server-Side Rendering (SSR)",
			"SSG",
			"Jest",
			"Cypress",
			"react-testing-library",
			"Percy",
			"useMemo",
			"useCallback",
			"React.memo",
			"virtualisation",
			"Vite",
		],
	},
	{
		title: "AI & LLM Integration",
		items: [
			"OpenAI API",
			"LangChain",
			"Pinecone",
			"Retrieval-Augmented Generation (RAG)",
			"Prompt Engineering",
			"Generative AI",
			"AI Agents",
			"AI-powered automation",
			"LLM integration",
			"Anthropic",
		],
	},
	{
		title: "Backend & Infrastructure",
		items: [
			"Node.js",
			"Python",
			"GraphQL",
			"REST APIs",
			"Kafka",
			"SQS",
			"Redis",
			"PostgreSQL",
			"S3",
			"Docker",
			"CI/CD (GitHub Actions)",
			"AWS",
			"Vercel",
			"Cloudflare",
			"Git",
			"Github",
			"Monorepo npm workspaces",
			"Microfrontends",
			"tRPC",
		],
	},
	{
		title: "Performance & Quality",
		items: [
			"Core Web Vitals (CWV)",
			"Lighthouse",
			"Code Splitting",
			"Bundle Optimization",
			"Web Performance Optimization",
			"A/B Testing",
			"Accessibility (WCAG)",
			"Technical SEO",
		],
	},
	{
		title: "Tools",
		items: [
			"Agile",
			"Jira",
			"Datadog",
			"Slack",
			"Code Reviews",
			"Technical Specifications",
			"Cross-functional Collaboration",
		],
	},
];

const skills = skillGroups.flatMap(({ items }) => items);

const HERO_SKILL_COUNT = 4;

function HomePage() {
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
						<Link className="nav__link" to="/projects">
							Projects
						</Link>
						<QuickInsight mode="mobile" />
					</nav>
				</div>
			</header>

			<div className="layout">
				<Sidebar profilePic={profilePic}>
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
								7+ years of experience building web applications with modern
								frontend tools. Experienced in product facing and enterprise
								style environments, working closely with product, design, QA,
								and backend teams.
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
						<h2 className="skills__title">Technical Skills</h2>

						<div className="skills__groups">
							{skillGroups.map((group) => (
								<section className="skills__group" key={group.title}>
									<h3 className="skills__group-title">{group.title}</h3>
									<div className="skills__grid">
										{group.items.map((skill) => (
											<span
												className="skill-pill"
												key={`${group.title}-${skill}`}
											>
												{skill}
											</span>
										))}
									</div>
								</section>
							))}
						</div>
					</section>

					<section className="skills">
						<h2 className="skills__title">Additional Information</h2>
						<div className="skills__groups">
							<section className="skills__group">
								<h3 className="skills__group-title">Education</h3>
								<p className="skills__description">
									Degree in Engineering Information Systems at National
									Technological University ("Universidad Tecnologica Nacional" -
									UTN), Rosario, Argentina
								</p>
							</section>
							<section className="skills__group">
								<h3 className="skills__group-title">Languages</h3>
								<div className="skills__grid">
									<span className="skill-pill">Spanish</span>
									<span className="skill-pill">English</span>
								</div>
							</section>
							<section className="skills__group">
								<h3 className="skills__group-title">Additional Information</h3>
								<div className="skills__grid">
									<span className="skill-pill">EU Citizenship (Italian)</span>
								</div>
							</section>
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

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/projects" element={<ProjectsPage />} />
		</Routes>
	);
}

export default App;
