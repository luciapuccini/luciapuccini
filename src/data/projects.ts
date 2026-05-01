export interface Project {
	name: string;
	url: string;
	description: string;
	stack: string[];
	screenshot: string | null;
}

export const projects: Project[] = [
	{
		name: "Magnaposi",
		url: "https://magnaposi.com",
		description:
			"SPA Marketing site for the MAGNAPOSI SM-500T. i18n (EN / ES) with a separate Vite entry point per locale. Contact form with spam protection via Netlify Forms",
		stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "Netlify"],
		screenshot: "/images/magnaposi.webp",
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
