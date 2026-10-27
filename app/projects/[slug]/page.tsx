import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github, Star, GitFork, Calendar, Check, Code2 } from "lucide-react";
import { getProjects, getReadme } from "@/lib/github";
import { ProjectArt } from "@/components/portfolio/project-art";
import { ContactCTA } from "@/components/portfolio/sections";
import { Reveal } from "@/components/portfolio/motion";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { projects } = await getProjects();
  const project = projects.find(item => item.name === slug);
  return { title: project?.title ?? "Project not found", description: project?.summary };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { projects, source } = await getProjects();
  const project = projects.find(item => item.name === slug);
  if (!project) notFound();
  const readme = await getReadme(project.name);
  const date = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(project.updated_at));
  return <main id="main-content"><section className="container project-detail"><Link href="/projects" className="back-link mono"><ArrowLeft size={16} /> ALL PROJECTS</Link><Reveal><div className="detail-eyebrow mono">{project.category} <span>/</span> {project.language ?? "Source code"}</div><h1>{project.title}<span className="accent">.</span></h1><p className="detail-summary">{project.summary}</p><div className="detail-actions"><a className="button button-primary" href={project.html_url} target="_blank" rel="noopener noreferrer"><Github size={18} /> View repository <ArrowUpRight size={17} /></a>{project.liveUrl && <a className="button button-outline" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Open demo <ArrowUpRight size={17} /></a>}</div></Reveal><Reveal className="detail-art"><ProjectArt art={project.art} title={project.title} /><p className="art-disclaimer mono">PROJECT ARTWORK · EXPLORE THE REPOSITORY FOR THE IMPLEMENTATION</p></Reveal><div className="detail-content-grid"><div>{project.highlights.length > 0 && <section className="project-highlights"><h2>What’s inside</h2>{project.highlights.map(item => <p key={item}><Check size={18} />{item}</p>)}</section>}<section className="readme-section"><div className="readme-title"><h2>From the repository</h2><Code2 size={22} /></div>{readme ? <><p className="readme-note">The repository’s README, shown as plain text.</p><pre className="readme-content">{readme}</pre></> : <div className="readme-unavailable"><p>The README preview is unavailable. You can explore the source and documentation on GitHub.</p><a className="text-link" href={project.html_url} target="_blank" rel="noopener noreferrer">Explore the repository <ArrowUpRight size={17} /></a></div>}</section></div><aside className="project-facts"><h3>Project details</h3><dl><div><dt>Stack</dt><dd className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</dd></div><div><dt><Calendar size={14} /> Updated</dt><dd>{date}</dd></div><div><dt><Star size={14} /> Stars</dt><dd>{project.stargazers_count}</dd></div><div><dt><GitFork size={14} /> Forks</dt><dd>{project.forks_count}</dd></div><div><dt>Source</dt><dd>{source === "github" ? "GitHub API" : "Saved GitHub snapshot"}</dd></div></dl><a href={project.html_url} className="text-link" target="_blank" rel="noopener noreferrer">importantboy / {project.name} <ArrowUpRight size={16} /></a></aside></div></section><ContactCTA /></main>;
}
