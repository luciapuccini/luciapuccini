const steps = [
	{
		role: "Frontend Developer",
		company: "Nimble.la",
		period: "2018–2019",
		href: "#nimble-1",
	},
	{
		role: "Independent Contributor",
		company: "Nimble.la",
		period: "2019–2021",
		href: "#nimble-2",
	},
	{
		role: "Software Engineer",
		company: "Gartner",
		period: "2021–2023",
		href: "#gartner-1",
	},
	{
		role: "Senior Software Engineer",
		company: "Gartner",
		period: "2023–2025",
		href: "#gartner-2",
	},
];

const Timeline = () => (
	<section className="timeline">
		<div className="timeline__track">
			{steps.map((step) => (
				<a className="timeline__step" href={step.href} key={step.role}>
					<span className="timeline__dot" />
					<span className="timeline__role">{step.role}</span>
					<span className="timeline__company">{step.company}</span>
					<span className="timeline__period">{step.period}</span>
				</a>
			))}
		</div>
	</section>
);

export default Timeline;
