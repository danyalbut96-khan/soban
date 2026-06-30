import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

export const metadata = {
  title: "Soban | AI Engineer & Prompt Engineering Expert",
  description: "Soban – AI Engineer, Prompt Engineer & AI Designer. I build custom AI systems, automation tools, and intelligent solutions for startups and businesses.",
  keywords: "AI Engineer, Prompt Engineer, AI Designer, Custom AI Tools, Automation, AI Workflow, Soban",
  openGraph: {
    title: "Soban | AI Engineer & Prompt Engineering Expert",
    description: "I build AI systems that work for you — custom models, prompt engines, and automation tools.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
