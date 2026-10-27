import type { Metadata } from "next";
import { ArrowDownRight, Github } from "lucide-react";
import { getProjects } from "@/lib/github";
import { ProjectGallery } from "@/components/portfolio/project-gallery";
import { Reveal } from "@/components/portfolio/motion";
import { ContactCTA, SectionLabel } from "@/components/portfolio/sections";

export const metadata: Metadata = { title: "Projects", description: "Explore Rahul Kumar’s GitHub projects, from web applications and e-commerce to developer tools and backend APIs." };
export const revalidate = 3600;
export default async function ProjectsPage() {
  const data = await getProjects();
  return <main id="main-content"><section className="container page-intro"><Reveal><SectionLabel number="01">THE PROJECT ARCHIVE</SectionLabel><div className="page-title-row"><h1>Built with<br /><span className="accent">purpose.</span></h1><ArrowDownRight strokeWidth={1} className="page-arrow" /></div><div className="page-intro-bottom"><p>A collection of ideas turned into working code.<br />Explore the projects, peek under the hood, or try a demo.</p><span className="github-pill"><Github size={17} /> importantboy <span>{data.projects.length} projects</span></span></div></Reveal></section><section className="container gallery-section"><ProjectGallery data={data} /></section><ContactCTA /></main>;
}
