export interface Project {
	name: string;
	url: string;
	description: string;
	stack: string[];
	screenshot: string | null;
}

export const projects: Project[] = [
	{
		name: "Project Alpha",
		url: "https://example.com",
		description:
			"A brief description of what this project does and the problem it solves. One or two sentences is ideal.",
		stack: ["React", "TypeScript", "Node.js"],
		screenshot: null,
	},
	{
		name: "Project Beta",
		url: "https://example.com",
		description:
			"A brief description of what this project does and the problem it solves. One or two sentences is ideal.",
		stack: ["Next.js", "SASS", "PostgreSQL"],
		screenshot: null,
	},
	{
		name: "Project Gamma",
		url: "https://example.com",
		description:
			"A brief description of what this project does and the problem it solves. One or two sentences is ideal.",
		stack: ["Vue", "GraphQL", "AWS"],
		screenshot: null,
	},
];
