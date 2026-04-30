import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import QuickInsight from "../sections/QuickInsight";
import "./ProjectsPage.scss";

const ProjectsPage = () => {
	return (
		<div className="projects-page">
			<header className="app__header">
				<div className="header__inner">
					<nav className="nav">
						<a className="nav__link" href="/#experience">
							Experience
						</a>
						<a className="nav__link" href="/#skills">
							Skills
						</a>
						<Link className="nav__link" to="/projects">
							Projects
						</Link>
						<QuickInsight mode="mobile" />
					</nav>
				</div>
			</header>

			<main className="projects-page__main">
				<div className="projects-page__container">
					<div className="projects-page__intro">
						<h1 className="projects-page__title">Projects</h1>
						<p className="projects-page__lead">
							A selection of things I&apos;ve built
						</p>
					</div>

					<ol className="projects-list" aria-label="Projects">
						{projects.map((project, idx) => (
							<li key={project.name} className="projects-list__item">
								<article className="project-entry">
									<a
										href={project.url}
										target="_blank"
										rel="noopener noreferrer"
										className="project-entry__screenshot-link"
										tabIndex={-1}
										aria-hidden="true"
									>
										<div className="project-entry__screenshot">
											{project.screenshot ? (
												<img
													src={project.screenshot}
													alt={`${project.name} screenshot`}
													className="project-entry__img"
												/>
											) : (
												<div
													className="project-entry__placeholder"
													aria-hidden="true"
												>
													<span className="project-entry__placeholder-index">
														{String(idx + 1).padStart(2, "0")}
													</span>
												</div>
											)}
										</div>
									</a>

									<div className="project-entry__body">
										<div className="project-entry__meta">
											<span className="project-entry__index">
												{String(idx + 1).padStart(2, "0")}
											</span>
										</div>

										<h2 className="project-entry__name">
											<a
												href={project.url}
												target="_blank"
												rel="noopener noreferrer"
												className="project-entry__name-link"
											>
												{project.name}
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
										</h2>

										<p className="project-entry__description">
											{project.description}
										</p>

										<ul
											className="project-entry__stack"
											aria-label="Tech stack"
										>
											{project.stack.map((tech) => (
												<li key={tech} className="project-entry__tech">
													{tech}
												</li>
											))}
										</ul>
									</div>
								</article>
							</li>
						))}
					</ol>
				</div>
			</main>

			<footer className="projects-page__footer">
				<div className="projects-page__footer-inner">
					<span>&copy; {new Date().getFullYear()} Lucia Puccini.</span>
				</div>
			</footer>
		</div>
	);
};

export default ProjectsPage;
