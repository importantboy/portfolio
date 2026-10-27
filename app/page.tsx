import Link from "next/link";
import { ArrowUpRight, Braces, Sparkles } from "lucide-react";
import { getProjects } from "@/lib/github";
import { Reveal } from "@/components/portfolio/motion";
import { SectionLabel, SkillsSection, ContactCTA } from "@/components/portfolio/sections";
import { ExperienceHero } from "@/components/portfolio/experience-hero";
import { ProjectSpotlight } from "@/components/portfolio/project-spotlight";
import { ApiPlayground } from "@/components/portfolio/api-playground";

export const revalidate = 3600;

export default async function Home() {
  const { projects } = await getProjects();
  const featured = ["truffle-box", "dsa-template", "shopify-headless"]
    .map(name => projects.find(project => project.name === name))
    .filter(project => project !== undefined);
  return <main id="main-content">
    <ExperienceHero repoCount={projects.length} />
    <div className="stack-ribbon"><div className="container"><span className="mono">GOOD IDEAS.<br />SOLID FOUNDATIONS.</span><div>{["React", "Next.js", "TypeScript", "Node.js", "MongoDB"].map(tech => <span key={tech}><Sparkles size={13} />{tech}</span>)}</div><span className="stack-ribbon-end"><Braces size={25} /></span></div></div>
    <section id="selected-work" className="section selected-work-v2"><div className="container"><Reveal><SectionLabel number="01">A FEW THINGS I’VE PUT INTO THE WORLD</SectionLabel><div className="section-heading"><h2>Made to explore.<br /><span className="muted">Built to be used.</span></h2><div><p>Pick a project. Look around.<br />There’s a story behind every screen.</p><Link href="/projects" className="text-link">All {projects.length} projects <ArrowUpRight size={18} /></Link></div></div></Reveal><Reveal><ProjectSpotlight projects={featured} /></Reveal></div></section>
    <section className="about-preview about-preview-v2 section"><div className="container about-preview-grid"><Reveal><SectionLabel number="02">THE PERSON BEHIND THE BRACKETS</SectionLabel><div className="about-monogram" aria-hidden="true"><span>stay curious.</span><Braces strokeWidth={.6} /><span>good things start there.</span><i>↗</i></div></Reveal><Reveal delay={.08}><h2>Curiosity drives me.<br /><span className="muted">Craft keeps me going.</span></h2><p>I’m Rahul, a full-stack developer who likes connecting the dots — between a good idea, a thoughtful interface, and the systems that make it work.</p><p>With a background in BCA at SVIET, I build with React, Node.js, and MongoDB. I care about clear code, useful products, and the little details that make something feel right.</p><Link href="/about" className="text-link">A little more about me <ArrowUpRight size={18} /></Link></Reveal></div></section>
    <SkillsSection />
    <ApiPlayground />
    <ContactCTA />
  </main>;
}