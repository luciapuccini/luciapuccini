interface SidebarProps {
	profilePic: string;
	cvPdfEN: string;
	cvPdfES: string;
	children?: React.ReactNode;
}

const IconDownload = () => (
	<svg
		aria-hidden="true"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
		<polyline points="7 10 12 15 17 10" />
		<line x1="12" y1="15" x2="12" y2="3" />
	</svg>
);

const IconLinkedIn = () => (
	<svg
		aria-hidden="true"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="currentColor"
	>
		<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
	</svg>
);

const IconMail = () => (
	<svg
		aria-hidden="true"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<rect x="2" y="4" width="20" height="16" rx="2" />
		<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
	</svg>
);

const Sidebar = ({ profilePic, cvPdfEN, cvPdfES, children }: SidebarProps) => (
	<aside className="sidebar">
		<img
			src={profilePic}
			alt="Lucia Puccini"
			className="sidebar__photo"
			width={260}
			height={320}
			fetchPriority="high"
		/>
		<nav className="sidebar__links">
			<a
				className="sidebar__link"
				href={cvPdfEN}
				download
				title="Download CV (EN)"
			>
				<IconDownload /> CV (EN)
			</a>
			<a
				className="sidebar__link"
				href={cvPdfES}
				download
				title="Download CV (ES)"
			>
				<IconDownload /> CV (ES)
			</a>
			<hr className="sidebar__divider" />
			<a
				className="sidebar__link"
				href="https://www.linkedin.com/in/luciapuccini/"
				target="_blank"
				rel="noreferrer"
				title="LinkedIn"
			>
				<IconLinkedIn /> LinkedIn
			</a>
			<a
				className="sidebar__link"
				href="mailto:puccinilucia@gmail.com"
				title="Email"
			>
				<IconMail /> Email
			</a>
		</nav>
		{children}
	</aside>
);

export default Sidebar;
