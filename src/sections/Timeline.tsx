const steps = [
  {
    role: "Frontend Engineer",
    company: "Nimble.LA",
    period: "2018–2021",
    href: "#nimble-1",
  },
  {
    role: "Software Engineer II",
    company: "Gartner",
    period: "2021–2025",
    href: "#gartner-1",
  },
  {
    role: "Software Engineer",
    company: "Consulting",
    period: "Present",
    href: "#consulting",
  },
];

const Timeline = () => (
  <section className="timeline">
    <div className="timeline__track">
      {steps.map((step) => (
        <a className="timeline__step" href={step.href} key={step.company}>
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
