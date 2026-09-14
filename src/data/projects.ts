export interface Project {
  name: string;
  url: string;
  githubUrl?: string;
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
    url: "https://farmaciaduret.online",
    description:
      "Website for a pharmacy in Villa Rosa, Buenos Aires — product catalog, online order form, and Telegram notifications for order submissions. Runs fully server-side on Cloudflare's edge network.",
    stack: [
      "Next.js 16",
      "TypeScript",
      "SCSS Modules",
      "Cloudflare Workers",
      "WhatsApp Business API",
    ],
    screenshot: "/images/farmacia_duret.webp",
  },
  {
    name: "StrengthSync",
    url: "https://app.strengthsync.ai/",
    githubUrl: "https://github.com/luciapuccini/strengthsync",
    description:
      "AI-powered strength training platform. Under development.",
    stack: [
      "Cloudflare",
      "Vercel AI SDK",
      "TypeScript",
      "Tailwind v4",
      "shadcn/radix UI",
    ],
    screenshot: "/images/strengthsync.webp",
  },
];
