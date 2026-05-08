export interface Project {
	name: string;
	url: string;
	description: string;
	stack: string[];
	screenshot: string | null;
}

export const projects: Project[] = [
	{
		name: "CYS Electronics",
		url: "https://cyselectronics.netlify.app/",
		description:
			"Corporate Marketing site for electronics company. Contact form with spam protection via Netlify Forms",
		stack: ["React", "TypeScript", "Vite", "Styled-components", "Netlify"],
		screenshot: "/images/cyselectronics.webp",
	},
	{
		name: "Farmacia Duret",
		url: "https://farmacia-duret.puccinilucia.workers.dev",
		description:
			"Website for a pharmacy in Villa Rosa, Buenos Aires — product catalog, online order form, and Telegram notifications for order submissions. Runs fully server-side on Cloudflare's edge network.",
		stack: [
			"Next.js 16",
			"TypeScript",
			"SCSS Modules",
			"Cloudflare Workers",
			"Telegram Bot API",
		],
		screenshot: "/images/farmacia_duret.webp",
	},
	{
		name: "StrengthSync",
		url: "https://strengthsync.ai",
		description:
			"Pre-launch landing for an AI-powered strength training platform that pairs a real personal trainer with an Apple Health–synced dashboard. Under development.",
		stack: ["Next.js 16", "TypeScript", "Tailwind v4", "shadcn/radix UI"],
		screenshot: "/images/strengthsync.webp",
	},
];
