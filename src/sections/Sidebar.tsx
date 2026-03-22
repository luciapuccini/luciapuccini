interface SidebarProps {
	profilePic: string;
	cvPdfEN: string;
	cvPdfES: string;
}

const Sidebar = ({ profilePic, cvPdfEN, cvPdfES }: SidebarProps) => (
	<aside className="sidebar">
		<img
			src={profilePic}
			alt="Lucia Puccini"
			className="sidebar__photo"
			width={260}
			height={320}
			fetchPriority="high"
		/>
		<div className="sidebar__links">
			<a className="sidebar__link" href={cvPdfEN} download title="Download CV (EN)">
				CV (EN)
			</a>
			<a className="sidebar__link" href={cvPdfES} download title="Download CV (ES)">
				CV (ES)
			</a>
			<a
				className="sidebar__link"
				href="https://www.linkedin.com/in/luciapuccini/"
				target="_blank"
				rel="noreferrer"
				title="LinkedIn"
			>
				LinkedIn
			</a>
			<a className="sidebar__link" href="mailto:luciapuccini@gmail.com" title="Email">
				Email
			</a>
		</div>
	</aside>
);

export default Sidebar;
